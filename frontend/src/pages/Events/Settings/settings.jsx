import React, { useEffect, useState } from "react";
import "./settings.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load user data from local storage when the page loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("signedInUser"));
    if (storedUser) {
      setUserData({
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
        email: storedUser.email || "",
        password: storedUser.password || "",
      });
    }
  }, []);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Handle password change separately
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Function to update user settings
  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate email format
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(userData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password change if provided
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }
      userData.password = newPassword; // Update password
    }

    // Save updated user details to local storage
    localStorage.setItem("signedInUser", JSON.stringify(userData));

    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <p>Edit your details and update your password</p>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="profile-form-container">
        <h2 className="edit-profile">Edit Profile</h2>
        <form className="profile-form" onSubmit={handleUpdate}>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />

          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />

          <label>New Password (Leave blank to keep current password)</label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <button className="save-btn" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
