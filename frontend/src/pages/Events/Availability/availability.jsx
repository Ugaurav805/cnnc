import React, { useState } from "react";
import "./availability.css";
import CalendarView from "../../Events/Availability/Calander.jsx";

const Availability = () => {
  const [view, setView] = useState("availability");
  const [weeklyHours, setWeeklyHours] = useState({
    Sun: { available: false, slots: [] },
    Mon: { available: true, slots: [{ start: "", end: "" }] },
    Tue: { available: true, slots: [{ start: "", end: "" }] },
    Wed: { available: true, slots: [{ start: "", end: "" }] },
    Thu: { available: true, slots: [{ start: "", end: "" }] },
    Fri: { available: true, slots: [{ start: "", end: "" }] },
    Sat: { available: true, slots: [{ start: "", end: "" }] },
  });

  const addTimeSlot = (day) => {
    setWeeklyHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "", end: "" }],
      },
    }));
  };

  const removeTimeSlot = (day, index) => {
    setWeeklyHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }));
  };

  const handleTimeChange = (day, index, field, value) => {
    setWeeklyHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  return (
    <div className="Availability-page">
      <div className="Availability-main-content">
        <div className="Availability-header">
          <div>
            <h1>Availability</h1>
            <p>Configure times when you are available for bookings</p>
          </div>
        </div>

        <div className="Availability-view-toggle">
          <button
            className={`Availability-toggle-button ${
              view === "availability" ? "Availability-active" : ""
            }`}
            onClick={() => setView("availability")}
          >
            Availability
          </button>
          <button
            className={`Availability-toggle-button ${
              view === "calendar" ? "Availability-active" : ""
            }`}
            onClick={() => setView("calendar")}
          >
            Calendar View
          </button>
        </div>

        {view === "availability" ? (
          <div className="Availability-container">
            <div className="Availability-schedule-container">
              <div className="Availability-schedule-header">
                <div className="Availability-activity">
                  <span>Event type</span>
                  <span className="Availability-arrow">›</span>
                </div>
                <div className="Availability-timezone">
                  <span>Indian Standard Time</span>
                  <span className="Availability-arrow">›</span>
                </div>
              </div>

              <div className="Availability-weekly-hours">
                <h3>Weekly hours</h3>
                {Object.entries(weeklyHours).map(
                  ([day, { available, slots }]) => (
                    <div key={day} className="Availability-day-row">
                      <div className="Availability-day-checkbox">
                        <input
                          type="checkbox"
                          checked={available}
                          onChange={() =>
                            day !== "Sun" &&
                            setWeeklyHours((prev) => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                available: !prev[day].available,
                              },
                            }))
                          }
                          disabled={day === "Sun"}
                        />
                        <span>{day}</span>
                      </div>

                      {available ? (
                        <div className="Availability-time-slots">
                          {slots.map((slot, index) => (
                            <div key={index} className="Availability-time-slot">
                              <input
                                type="time"
                                value={slot.start}
                                onChange={(e) =>
                                  handleTimeChange(
                                    day,
                                    index,
                                    "start",
                                    e.target.value
                                  )
                                }
                              />
                              <span>-</span>
                              <input
                                type="time"
                                value={slot.end}
                                onChange={(e) =>
                                  handleTimeChange(
                                    day,
                                    index,
                                    "end",
                                    e.target.value
                                  )
                                }
                              />
                              <button onClick={() => removeTimeSlot(day, index)}>
                                ×
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addTimeSlot(day)}
                            className="Availability-add-time"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="Availability-unavailable">
                          Unavailable
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <CalendarView />
        )}
      </div>
    </div>
  );
};

export default Availability;