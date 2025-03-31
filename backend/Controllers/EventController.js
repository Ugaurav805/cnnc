const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Event = require("../Models/event");
const Availability = require("../Models/availability");
const User = require("../Models/user");
const EventForm = require("../Models/eventform");

// ✅ Check for duplicate event title
const checkDuplicateEvent = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const existingEvent = await Event.findOne({ title: title.trim() });

    if (existingEvent) {
      return res.json({ success: true, exists: true });
    }

    res.json({ success: true, exists: false });
  } catch (error) {
    console.error("Error checking duplicate event:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Create an event
const createEvent = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    const { title, description, dateTime, duration, link, bannerImage, backgroundColor, password, emails } = req.body;

    // Check if event with same title exists
    const existingEvent = await Event.findOne({ title, createdBy: req.user.userId });
    if (existingEvent) {
      return res.status(409).json({ success: false, message: "Event title already exists" });
    }

    const start = new Date(dateTime);
    const end = new Date(start.getTime() + duration * 60000);

    // Check for time conflicts
    const conflicts = await Event.find({
      createdBy: req.user.userId,
      dateTime: { $lt: end },
      $expr: { $gt: [{ $add: ["$dateTime", { $multiply: ["$duration", 60000] }] }, start] },
    });

    if (conflicts.length > 0) {
      return res.status(409).json({ success: false, message: "Time slot conflict" });
    }

    // Check availability
    const dayOfWeek = start.getDay();
    const startTime = start.toTimeString().slice(0, 5);
    const endTime = end.toTimeString().slice(0, 5);

    const availability = await Availability.findOne({
      userId: req.user.userId,
      dayOfWeek,
      startTime: { $lte: startTime },
      endTime: { $gte: endTime },
      isAvailable: true,
    });

    if (!availability) {
      return res.status(409).json({ success: false, message: "Not available at this time" });
    }

    // Handle Participants
    const participantEmails = emails ? emails.split(",").map(email => email.trim()) : [];
    const participants = await User.find({ email: { $in: participantEmails } });

    if (participants.length !== participantEmails.length) {
      const foundEmails = participants.map(user => user.email);
      const missingEmails = participantEmails.filter(email => !foundEmails.includes(email));
      return res.status(400).json({
        success: false,
        message: `Invalid emails: ${missingEmails.join(", ")}`,
      });
    }

    const participantList = participants.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      user: user._id,
      status: "pending",
    }));

    // Create and Save Event
    const event = new Event({
      title,
      description,
      dateTime,
      duration,
      link,
      bannerImage,
      backgroundColor,
      password: password ? await bcrypt.hash(password, 10) : undefined,
      participants: participantList,
      createdBy: req.user.userId,
    });

    await event.save();
    res.status(201).json({ success: true, message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ✅ Get all events
const getEvents = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    const events = await Event.find({ createdBy: req.user.userId }).populate("createdBy", "firstName lastName email");
    res.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ✅ Get event by ID
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }

    const event = await Event.findById(eventId).populate("createdBy", "firstName lastName email");

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ✅ Delete an event
const deleteEvent = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }

    const event = await Event.findOneAndDelete({ _id: eventId, createdBy: req.user.userId });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ✅ Submit event form
const submitEventForm = async (req, res) => {
  try {
    const { eventId, fullName, email, phone, additionalInfo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }

    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const eventForm = new EventForm({ eventId, fullName, email, phone, additionalInfo });
    await eventForm.save();

    res.status(201).json({ success: true, message: "Event form submitted successfully", eventForm });
  } catch (error) {
    console.error("Error submitting event form:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ✅ Verify event password
const verifyEventPassword = async (req, res) => {
  try {
    const { eventId, password } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (!event.password) {
      return res.json({ success: true, message: "No password required" });
    }

    const isMatch = await bcrypt.compare(password, event.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.json({ success: true, message: "Access granted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ✅ Export all functions
module.exports = { checkDuplicateEvent, createEvent, getEvents, getEventById, deleteEvent, submitEventForm, verifyEventPassword };
