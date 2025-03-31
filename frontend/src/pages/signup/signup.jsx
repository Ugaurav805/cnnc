import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import rightside from "../../assets/rightside.png";
import CNNCTlogo from "../../assets/CNNCTlogo.svg";

function SignUp() {
  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value.trim(),
    }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = (name) => /^[a-zA-Z]+$/.test(name);
  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const { firstName, lastName, email, password, confirmPassword, terms } =
      signupInfo;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !terms
    ) {
      newErrors.general =
        "All fields including terms of service must be accepted.";
    }

    if (!isValidName(firstName))
      newErrors.firstName = "First name should contain only alphabets.";
    if (!isValidName(lastName))
      newErrors.lastName = "Last name should contain only alphabets.";
    if (!isValidEmail(email)) newErrors.email = "Invalid email format.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!isValidPassword(password))
      newErrors.password =
        "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = "https://meetingeventplaner-cnnct.onrender.com/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error, userId } = result; // Assuming backend returns userId

      if (success) {
        handleSuccess(message);

        const userObject = {
          userId,
          firstName,
          lastName,
          email,
          password,
        };

        localStorage.setItem("signedInUser", JSON.stringify(userObject));

        setTimeout(() => navigate("/preferences"), 1000);
      } else {
        handleError(
          error?.details?.[0]?.message || message || "Something went wrong"
        );
      }
    } catch {
      handleError("Server error, please try again later.");
    }
  };

  return (
    <div className="sigup-container">
      <div className="signup-logo">
        <img src={CNNCTlogo} alt="CNNCT Logo" className="signup-cnnct-logo" />
      </div>
      <div className="signup-container">
        <span className="signup-link">
          <h1 className="signup-h1">Create an account</h1>
          <Link to="/signin">Sign in instead</Link>
        </span>
        <form onSubmit={handleSignUp}>
          {errors.general && <p className="signup-error">{errors.general}</p>}
          <div className="signup-form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="firstName"
              name="firstName"
              value={signupInfo.firstName}
            />
            {errors.firstName && (
              <p className="signup-error">{errors.firstName}</p>
            )}
          </div>
          <div className="signup-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="lastName"
              name="lastName"
              value={signupInfo.lastName}
            />
            {errors.lastName && (
              <p className="signup-error">{errors.lastName}</p>
            )}
          </div>
          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={signupInfo.email}
            />
            {errors.email && <p className="signup-error">{errors.email}</p>}
          </div>
          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={signupInfo.password}
            />
            {errors.password && (
              <p className="signup-error">{errors.password}</p>
            )}
          </div>
          <div className="signup-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signupInfo.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="signup-error">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="signup-form-group1">
            <label htmlFor="terms" className="checkbox-container">
              <input
                className="checkboxflex"
                onChange={handleChange}
                type="checkbox"
                id="terms"
                name="terms"
                checked={signupInfo.terms}
              />
              <span className="checkbox-label">
                By creating an account, I agree to our
                <Link
                  to="https://policies.google.com/terms"
                  className="terms-link"
                >
                  {" "}
                  Terms of Use{" "}
                </Link>
                and
                <Link
                  to="https://policies.google.com/privacy"
                  className="terms-link"
                >
                  {" "}
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button className="signup-button" type="submit">
            Create an account
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className="signup-right">
        <img
          src={rightside}
          alt="Signin Illustration"
          className="signin-image"
        />
      </div>
    </div>
  );
}

export default SignUp;
