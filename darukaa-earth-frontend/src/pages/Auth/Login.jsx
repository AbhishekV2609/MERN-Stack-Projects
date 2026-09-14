import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setMessage("Email and password are required");
    }

    if (form.password.length < 8) {
      return setMessage("Invalid credentials");
    }

    //  Mock login success
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        {message && <div className="error">{message}</div>}

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="input-group password-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="forgot-link">
          <span onClick={() => setShowForgot(true)}>
            Forgot password?
          </span>
        </div>

        <button className="primary-btn">Login</button>

        <p className="auth-footer">
          Don’t have an account?
          <span onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </form>

      {/* ===== FORGOT PASSWORD MODAL ===== */}
      {showForgot && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reset Password</h3>
            <p>
              Enter your email to receive reset instructions
            </p>

            <input type="email" placeholder="you@example.com" />

            <button
              className="primary-btn"
              onClick={() => {
                setShowForgot(false);
                alert("Password reset email sent (mock)");
              }}
            >
              Send Reset Email
            </button>

            <span
              className="close"
              onClick={() => setShowForgot(false)}
            >
              ✖
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
