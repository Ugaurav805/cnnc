import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./EventForm.css";

function EventForm() {
  const navigate = useNavigate();

  // Memoize initial event data
  const initialEventData = useMemo(
    () => ({
      eventTopic: "",
      password: "",
      hostName: "",
      description: "",
      date: "",
      time: "12:00",
      period: "AM",
      timezone: "UTC +5:00 Delhi",
      duration: "1 hour",
    }),
    []
  );

  const [eventData, setEventData] = useState(initialEventData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.eventTopic || !eventData.date) {
      alert("Please fill in all required fields!");
      return;
    }

    // Store the latest event in localStorage for EventForm2.jsx
    localStorage.setItem("latestEvent", JSON.stringify(eventData));

    // Navigate to eventform2 with event data
    navigate("/dashboard/eventform2", { state: eventData });
  };

  return (
    <div className="event-form-container">
      <header className="event-form-header">
        <h1>Create Event</h1>
        <p>Create events to share for people to book on your calendar.</p>
        <p>New</p>
      </header>
      <div className="white-event-form">
        <h2 className="event-form-title">Add Event</h2>
        <hr />
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="event-form-grid">
            <label>
              Event Topic <span className="required">*</span>
            </label>
            <input
              type="text"
              name="eventTopic"
              placeholder="Set a conference topic"
              value={eventData.eventTopic}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={eventData.password}
              onChange={handleChange}
            />

            <label>
              Host Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="hostName"
              placeholder="Enter host name"
              value={eventData.hostName}
              onChange={handleChange}
            />

            <label>Description</label>
            <textarea
              name="description"
              placeholder="Add a description..."
              value={eventData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <hr />
          <div className="event-form-grid">
            <label>
              Date and Time <span className="required">*</span>
            </label>
            <div className="event-form-date-time">
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />
              <select
                name="time"
                value={eventData.time}
                onChange={handleChange}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option
                    key={i}
                    value={`${String(i + 1).padStart(2, "0")}:00`}
                  >
                    {String(i + 1).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
              <select
                name="period"
                value={eventData.period}
                onChange={handleChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <select
                name="timezone"
                value={eventData.timezone}
                onChange={handleChange}
              >
                <option value="UTC +5:00 Delhi">UTC +5:00 Delhi</option>
                <option value="UTC +0:00 London">UTC +0:00 London</option>
                <option value="UTC -5:00 New York">UTC -5:00 New York</option>
                <option value="UTC +8:00 Beijing">UTC +8:00 Beijing</option>
                <option value="UTC +10:00 Sydney">UTC +10:00 Sydney</option>
              </select>
            </div>

            <label>Set Duration</label>
            <select
              name="duration"
              value={eventData.duration}
              onChange={handleChange}
            >
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>

          <div className="event-form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="save-button">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
