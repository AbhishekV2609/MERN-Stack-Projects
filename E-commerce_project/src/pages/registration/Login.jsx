import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotChange = (e) => {
    setForgotEmail(e.target.value);
  };

  // ✅ LOGIN SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Dummy User Data
    const loggedInUser = {
      userId: Date.now(),
      name: formData.email.split("@")[0],
      email: formData.email,
      phone: "",
      profileImage: "",
      dateOfBirth: "",
      gender: "",
      joinedDate: new Date().toISOString(),

      addresses: [],
      cart: [],
      wishlist: [],
      orders: [],

      paymentMethods: [],

      settings: {
        language: "English",
        currency: "INR",
        darkMode: false,
      },
    };

    // ✅ Save User in Redux + LocalStorage
    dispatch(setUser(loggedInUser));

    // ✅ Navigate
    navigate("/profile");
  };

  // ✅ FORGOT PASSWORD
  const handleForgotSubmit = (e) => {
    e.preventDefault();

    if (!forgotEmail) {
      setForgotMsg("Please enter your email!");
      return;
    }

    setForgotMsg(
      `Password reset link sent to ${forgotEmail}`
    );

    setForgotEmail("");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">
          Welcome Back
        </h2>

        <p className="login-subtitle">
          Please log in to continue
        </p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <span
              className="toggle-password"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <AiFillEyeInvisible />
              ) : (
                <AiFillEye />
              )}
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button type="submit">
            Login
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <p
          className="forgot-text"
          onClick={() =>
            setShowForgot(!showForgot)
          }
        >
          Forgot Password?
        </p>

        {showForgot && (
          <form
            className="forgot-form"
            onSubmit={handleForgotSubmit}
          >
            <input
              type="email"
              value={forgotEmail}
              onChange={handleForgotChange}
              placeholder="Enter your email"
              required
            />

            <button type="submit">
              Send Reset Link
            </button>

            {forgotMsg && (
              <p className="forgot-msg">
                {forgotMsg}
              </p>
            )}
          </form>
        )}

        {/* SIGNUP */}
        <p className="login-footer">
          Don’t have an account?{" "}
          <Link to="/signup">
            signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;