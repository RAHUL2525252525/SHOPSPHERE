import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

// Styled Icons
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20" />
  </svg>
);

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Added state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !newPassword || !confirmPassword) {
      setMessageType("error");
      setMessage("Please fill in all fields");
      return;
    }
    if (newPassword.length < 8) {
      setMessageType("error");
      setMessage("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://shopsphere-backend-5umn.onrender.com/api/auth/forgot-password", {
        email,
        newPassword,
      });
      setMessageType("success");
      setMessage(response.data);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessageType("error");
      const data = error.response ? error.response.data : null;
      setMessage(typeof data === "string" ? data : (data?.message || data?.error || "Server connection failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shopsphere-theme-viewport">
      <div className="theme-backdrop" aria-hidden="true" />
      <main className="theme-auth-portal">
        <form onSubmit={handleSubmit} className="theme-auth-form">
          <div className="brand-header-group">
            <div className="header-signal-arches">
              <span className="arch-1" />
              <span className="arch-2" />
            </div>
            <h1 className="brand-logo-text">RESET ACCESS</h1>
          </div>

          {message && <div className={`error-badge-pill ${messageType}`}>{message}</div>}

          <div className="input-pill-field">
            <div className="pill-field-icon"><UserIcon /></div>
            <input
              type="email"
              placeholder="Email Address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* New Password Input with Toggle */}
          <div className="input-pill-field">
            <div className="pill-field-icon"><LockIcon /></div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-eye-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Confirm Password Input with Toggle */}
          <div className="input-pill-field">
            <div className="pill-field-icon"><LockIcon /></div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-eye-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <button type="submit" className="submit-pill-action" disabled={loading}>
            {loading ? "Processing..." : "Update Password"}
          </button>

          <div className="action-link-row">
            <button type="button" className="action-sub-link" onClick={() => navigate("/login")}>
              BACK TO LOGIN
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
