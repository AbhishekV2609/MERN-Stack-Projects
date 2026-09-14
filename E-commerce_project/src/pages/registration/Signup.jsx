import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Signup.css";
function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState("buyer"); // default role
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live password validation
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const regexNumber = /[0-9]/;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 8 || password.length > 16) {
      setPasswordError("Password must be 8-16 characters long.");
    } else if (!regexNumber.test(password)) {
      setPasswordError("Password must contain at least one number.");
    } else if (!regexSpecial.test(password)) {
      setPasswordError("Password must contain at least one special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (passwordError) return;

    // Add selected role to data before submitting
    const fullData = { ...formData, role };

    console.log("Form Submitted:", fullData);
    alert("Sign Up Successful!");
    navigate("/info", { state: fullData });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>

    
    <div className="btncontainer">
  <label className="main-label">Select Role:</label>

  <div className="role-options">
    <button
      type="button"
      className={`role-btn ${role === "buyer" ? "active" : ""}`}
      onClick={() => {
        setRole("buyer");
        console.log("Selected Role: Buyer");
      }}
    >
      Buyer
    </button>

    <button
      type="button"
      className={`role-btn ${role === "seller" ? "active" : ""}`}
      onClick={() => {
        setRole("seller");
        console.log("Selected Role: Seller");
      }}
    >
      Seller
    </button>
  </div>
</div>


        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {passwordError && <p className="error-msg">{passwordError}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword1 ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <NavLink to="/login">
            <b>Login</b>
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;