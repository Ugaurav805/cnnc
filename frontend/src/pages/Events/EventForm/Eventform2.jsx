import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Eventform2.css";

const Eventform = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve event data from state or local storage
  const eventData = useMemo(() => {
    return (
      location.state || JSON.parse(localStorage.getItem("latestEvent")) || {}
    );
  }, [location.state]);

  const [banner] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [participants, setParticipants] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  // Redirect if no event data
  useEffect(() => {
    if (!eventData?.eventTopic) {
      navigate("/dashboard/eventform");
    }
  }, [eventData, navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to create an event.");
      return;
    }

    // Prevent multiple clicks
    if (handleSave.isProcessing) return;
    handleSave.isProcessing = true;

    // Construct new event object
    const newEvent = {
      title: eventData.eventTopic,
      description: eventData.description,
      dateTime: `${eventData.date}T${eventData.time}`,
      duration: parseInt(eventData.duration) || 60,
      link: meetingLink,
      bannerImage: banner,
      backgroundColor,
      password: eventData.password,
      participants: participants
        .split(",")
        .map((email) => ({ name: email.trim(), status: "pending" })),
    };

    try {
      // Check if event already exists with this title for the current user
      const existingEventResponse = await axios.get(
        `https://meetingeventplaner-cnnct.onrender.com/events/check-duplicate`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { title: eventData.eventTopic },
        }
      );

      if (existingEventResponse.data.exists) {
        alert(
          "An event with this title already exists! Please use a different title."
        );
        handleSave.isProcessing = false;
        return;
      }

      // Save new event
      const response = await axios.post(
        "https://meetingeventplaner-cnnct.onrender.com/events",
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Event saved successfully!");
        navigate("/dashboard");
      } else {
        alert("Failed to save event!");
      }
    } catch (error) {
      console.error("Error saving event:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
          "An error occurred while saving the event."
      );
    } finally {
      handleSave.isProcessing = false; // Reset flag
    }
  };

  return (
    <div className="event2-form-container">
      <header className="event2-form-header">
        <h1>Create Event</h1>
        <p>Create events to share for people to book on your calendar.</p>
        <p>New</p>
      </header>

      <div className="white-event2-form">
        <h2 className="event2-form-title">Add Event</h2>
        <hr className="event2-divider" />

        <div className="banner-section">
          <label className="banner-label">Banner</label>
          <div className="banner-box" style={{ backgroundColor }}>
            <span className="emoji">👦</span>
          </div>
        </div>

        <div className="event2-form-grid">
          <label>Custom Background Color:</label>
          <div className="color-options">
            <button
              className="color-btn red"
              onClick={() => setBackgroundColor("#ff4d4d")}
            ></button>
            <button
              className="color-btn orange"
              onClick={() => setBackgroundColor("#ffa500")}
            ></button>
            <button
              className="color-btn black"
              onClick={() => setBackgroundColor("#000")}
            ></button>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
        </div>

        <hr className="event2-divider" />

        <div className="event2-form-grid">
          <label>Add Link*</label>
          <input
            type="text"
            placeholder="Enter Meeting Link (Google Meet, Zoom, etc.)"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
        </div>

        <div className="event2-form-grid">
          <label>Add Emails*</label>
          <input
            type="text"
            placeholder="Enter participant emails (comma-separated)"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="event2-form-buttons">
          <button
            className="cancel-button"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Eventform;
