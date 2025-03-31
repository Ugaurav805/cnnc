import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import "./Booking.css";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch booking data dynamically
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings"); // Adjust API endpoint as needed
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // Function to filter events based on selected tab
  const filterEvents = () => {
    const now = new Date();
    return [...bookings, ...events].filter((item) => {
      const eventDateTime = new Date(`${item.date} ${item.time}`);

      if (activeTab === "Upcoming") {
        return eventDateTime > now && item.status !== "Rejected"; 
      }
      if (activeTab === "Pending") {
        return !item.status || item.status === "Pending"; 
      }
      if (activeTab === "Canceled") {
        return item.status === "Rejected" || item.status === "Canceled"; 
      }
      if (activeTab === "Past") {
        return eventDateTime < now;
      }
      return true;
    });
  };

  // Function to update event status
  const updateStatus = (index, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((item, idx) =>
        idx === index ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="bookingpage">
      <header className="bookingheader">
        <h1>Booking</h1>
        <p>See upcoming and past events booked through your event type links.</p>
      </header>
      <div className="booking-container">
        <Sidebar />
        <div className="bookingcontent">
          <main className="booking-main-content">
            {/* Booking Tabs */}
            <div className="booking-tabs">
              {["Upcoming", "Pending", "Canceled", "Past"].map((tab) => (
                <span
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* Filtered Booking List */}
            <div className="booking-list">
              {filterEvents().map((item, index) => {
                const eventDate = new Date(item.date);
                const dayOfWeek = eventDate.toLocaleDateString("en-US", { weekday: "long" });
                const formattedDate = eventDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

                return (
                  <div key={index} className="booking-card">
                    <div className="booking-date">{dayOfWeek}, {formattedDate}</div>
                    <div className="booking-details">
                      <div className="booking-title">{item.eventTopic || "No Topic"}</div>
                      <div className="booking-actions">
                        {item.status === "Accepted" ? (
                          <span className="accepted-status">Accepted</span>
                        ) : item.status === "Rejected" ? (
                          <span className="rejected-status">Rejected</span>
                        ) : (
                          <>
                            <button className="accept-btn" onClick={() => updateStatus(index, "Accepted")}>
                              Accept
                            </button>
                            <button className="reject-btn" onClick={() => updateStatus(index, "Rejected")}>
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                      <div className="booking-participants">
                        <strong>Participants:</strong> {item.participants ? item.participants.join(", ") : "N/A"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Booking;
