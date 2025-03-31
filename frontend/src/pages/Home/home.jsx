import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import CNNCTlogo from "../../assets/CNNCTlogo.svg";
import screen from "../../assets/screen 1.png";
import scree from "../../assets/screen 3.png";
import Fantastical from "../../assets/Fantastical 1.png";
import testimonial from "../../assets/testimonials.png";
import Frame from "../../assets/Frame.png";
import secondlast from "../../assets/secondlast.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={CNNCTlogo} alt="CNNCT Logo" />
      </div>
      <button className="primary-button" onClick={() => navigate("/signin")}>
        Sign up free
      </button>
    </nav>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <h1 className="hero-title">CNNCT – Easy Scheduling Ahead</h1>
      <button className="primary-button hero-button" onClick={() => navigate("/signin")}>
        Sign up free
      </button>
      <div className="hero-image">
        <img src={screen} alt="Platform preview" />
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">Simplified scheduling for you and your team</h2>
      <p className="features-description">
        CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link, and let others book time with you instantly.
      </p>
    </section>
  );
};

const Calendar = () => {
  return (
    <section className="calendar-section">
      <div className="calendar-content">
        <div className="calendar-text">
          <h2 className="section-title">Stay Organized with Your Calendar & Meetings</h2>
          <p className="section-subtitle">Seamless Event Scheduling</p>
          <ul className="feature-list">
            <li>View all your upcoming meetings and appointments in one place.</li>
            <li>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts.</li>
            <li>Customize event types: one-on-ones, team meetings, group sessions, and webinars.</li>
          </ul>
        </div>
        <div className="calendar-images">
          <div className="calendar-img-container">
            <img src={Fantastical} alt="Calendar view" className="calendar-img" />
          </div>
          <div className="schedule-img-container">
            <img src={scree} alt="Schedule view" className="schedule-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="section-title">
          Here's what our <span className="highlight">customer</span> has to say
        </h2>
        <button className="secondary-button">Read customer stories</button>
      </div>
      <div className="testimonials-content">
        <img src={testimonial} alt="Customer testimonials" className="testimonials-img" />
      </div>
    </section>
  );
};

const Integrations = () => {
  return (
    <section className="integrations-section">
      <h2 className="section-title">All Link Apps and Integrations</h2>
      <div className="integrations-grid">
        <img src={secondlast} alt="Integration apps" className="integrations-img" />
      </div>
      <div className="footer-frame">
        <img src={Frame} alt="Footer content" className="footer-img" />
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <HeroSection />
      <Features />
      <Calendar />
      <Testimonials />
      <Integrations />
    </div>
  );
};

export default LandingPage;