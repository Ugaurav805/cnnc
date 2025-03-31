import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCopy } from "@fortawesome/free-solid-svg-icons";
import "./events.css";

const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const toggleEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isActive = !updatedEvents[index].isActive;
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const deleteEvent = (index) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((_, i) => i !== index);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const copyEventDetails = (event) => {
    const eventText = `Event: ${event.eventTopic}\nDate: ${formatDate(event.date)}\nTime: ${formatTime(event.time)} - ${calculateEndTime(event.time, event.duration)}\nDescription: ${event.description}`;
    navigator.clipboard.writeText(eventText);
    alert("Event details copied to clipboard!");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    let [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return "N/A";
    let [hour, minute] = startTime.split(":").map(Number);
    let endHour = hour + parseInt(duration);
    return formatTime(`${endHour}:${minute.toString().padStart(2, "0")}`);
  };

  return (
    <div className="event-container">
      <Sidebar />
      <main className="event-main-content">
        <header className="event-header">
          <div>
            <h1>Event Types</h1>
            <p>Create events to share for people to book on your calendar.</p>
          </div>
        </header>

        <button className="add-event-btn" onClick={() => navigate("/dashboard/eventform")}>
          + Add New Event
        </button>

        <section className="event-list">
          {events.map((event, index) => (
            <div key={index} className={`event-card ${event.isActive ? "active" : "inactive"}`}>
              <div className="event-card-header">
                <h2>{event.eventTopic}</h2>
                <button className="event-edit-btn">✏️</button>
              </div>

              <div className="event-card-content">
                <p className="event-date">{formatDate(event.date)}</p>
                <p className="event-time">
                  <strong>
                    {formatTime(event.time)} - {calculateEndTime(event.time, event.duration)}
                  </strong>
                </p>
                <p className="event-description">{event.description}</p>
              </div>

              <div className="event-card-footer">
                {/* Toggle Switch */}
                <div className={`toggle-switch ${event.isActive ? "on" : "off"}`} onClick={() => toggleEvent(index)}>
                  <div className={`toggle-btn ${event.isActive ? "on" : "off"}`}></div>
                </div>

                <div className="event-actions">
                  <button className="event-copy-btn" onClick={() => copyEventDetails(event)}>
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <button className="event-delete-btn" onClick={() => deleteEvent(index)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Event;
