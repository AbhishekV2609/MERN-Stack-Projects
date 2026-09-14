import { useNavigate } from "react-router-dom";
import "./Auth.css";

function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify Your Email</h2>
        <p className="subtitle">
          We’ve sent a verification link to your email
        </p>

        <div className="info-box">
          Please check your inbox and click the verification
          link to activate your account.
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/login")}
        >
          I’ve Verified My Email
        </button>

        <p className="auth-footer">
          Didn’t receive email?
          <span onClick={() => alert("Email resent (mock)")}>
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
