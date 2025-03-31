import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faDollarSign,
  faLandmark,
  faComments,
  faUserTie,
  faLaptopCode,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import "./preferences.css";
import CNNCTlogo from "../../assets/CNNCTlogo.svg";
import rightside from "../../assets/rightside.png";

const Preferences = () => {
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/signup");
    }
  }, [userId, navigate]);

  const categories = [
    { icon: faBriefcase, label: "Sales" },
    { icon: faGraduationCap, label: "Education" },
    { icon: faDollarSign, label: "Finance" },
    { icon: faLandmark, label: "Government & Politics" },
    { icon: faComments, label: "Consulting" },
    { icon: faUserTie, label: "Recruiting" },
    { icon: faLaptopCode, label: "Tech" },
    { icon: faBullhorn, label: "Marketing" },
  ];

  const handleContinue = () => {
    setErrorMessage("");
    if (!username.trim()) {
      setErrorMessage("Please enter a username.");
      return;
    }
    if (!selectedCategory) {
      setErrorMessage("Please select a category.");
      return;
    }

    localStorage.setItem("username", username);
    navigate("/dashboard/events");
  };

  return (
    <div className="Preferences-container">
      <div className="Preferences-logo-container">
        <img
          src={CNNCTlogo}
          alt="Preferences-CNNCT Logo"
          className="Preferences-cnnct-logo"
        />
      </div>
      <div className="Preferences-positioncontainer">
        <h1 className="Preferences-title">Your Preferences</h1>
        <input
          type="text"
          className="Preferences-input"
          placeholder="Tell us your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="Preferences-subtitle">
          Select one category that best describes your CNNCT:
        </p>
        <div className="Preferences-grid">
          {categories.map((category) => (
            <button
              key={category.label}
              className={`Preferences-category-button ${
                selectedCategory === category.label ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory(category.label)}
            >
              <FontAwesomeIcon
                icon={category.icon}
                className="Preferences-icon"
              />
              {category.label}
            </button>
          ))}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button
          className="Preferences-continue-button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      <div className="Preferences-signin-right">
        <img
          src={rightside}
          alt="Signin Illustration"
          className="Preferences-signin-image"
        />
      </div>
    </div>
  );
};

export default Preferences;