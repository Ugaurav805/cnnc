import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import CNNCTlogo from "../../assets/CNNCTlogo.svg";
import profileIcon from "../../assets/icons/banner.png";

// Import icons
import eventIcon from "../../assets/icons/events.svg";
import bookingIcon from "../../assets/icons/booking.svg";
import availabilityIcon from "../../assets/icons/availability.svg";
import settingsIcon from "../../assets/icons/settings.svg";

const Sidebar = () => {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("signedInUser");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUsername(`${user.firstName} ${user.lastName}`);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={CNNCTlogo} alt="CNNCT Logo" />
      </div>
      <nav className="sidebar-menu">
        <Link to="/dashboard/events" className="sidebar-menu-item">
          <img src={eventIcon} alt="Events" className="sidebar-menu-icon" />
          Events
        </Link>
        <Link to="/dashboard/booking" className="sidebar-menu-item">
          <img src={bookingIcon} alt="Booking" className="sidebar-menu-icon" />
          Booking
        </Link>
        <Link to="/dashboard/availability" className="sidebar-menu-item">
          <img src={availabilityIcon} alt="Availability" className="menu-icon" />
          Availability
        </Link>
        <Link to="/dashboard/settings" className="sidebar-menu-item">
          <img src={settingsIcon} alt="Settings" className="sidebar-menu-icon" />
          Settings
        </Link>
        <Link to="/dashboard/eventform" className="sidebar-create-button"> + Create </Link>
      </nav>

      <div className="sidebar-profile">
        <img src={profileIcon} alt="User" className="sidebar-profile-icon" />
        <span className="sidebar-profile-name">{username}</span>
      </div>
    </aside>
  );
};

export default Sidebar;
