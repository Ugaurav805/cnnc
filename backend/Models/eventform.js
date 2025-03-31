const mongoose = require("mongoose");

const eventFormSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    additionalInfo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const EventForm = mongoose.model("EventForm", eventFormSchema);
module.exports = EventForm;
