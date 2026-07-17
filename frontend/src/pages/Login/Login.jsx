import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";

import "./Login.css";

// Styled Icons matching the minimalist aesthetic of the reference
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

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // State variables preserved to keep logic functional
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      if (!data || !data.token) {
        setError("Invalid email or password");
        return;
      }
      if (data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="shopsphere-theme-viewport">
      {/* Immersive cinematic background with retail/sunset wash */}
      <div className="theme-backdrop" aria-hidden="true" />

      {/* Main Centered Authentication Portal */}
      <main className="theme-auth-portal">
        <form onSubmit={handleSubmit} className="theme-auth-form">
          
          {/* Circular Brand Signal Header with Title */}
          <div className="brand-header-group">
            <div className="header-signal-arches">
              <span className="arch-1" />
              <span className="arch-2" />
            </div>
            <h1 className="brand-logo-text">SHOPSPHERE</h1>
          </div>

          {error && <div className="error-badge-pill">{error}</div>}

          {/* Stadium Inputs */}
          <div className="input-pill-field">
            <div className="pill-field-icon">
              <UserIcon />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-pill-field">
            <div className="pill-field-icon">
              <LockIcon />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password..."
              value={formData.password}
              onChange={handleChange}
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

          {/* Now UI Signature Orange Button */}
          <button type="submit" className="submit-pill-action">
            Get Started
          </button>

          {/* Sub-actions mapped directly below submit */}
          <div className="action-link-row">
            <button
              type="button"
              className="action-sub-link"
              onClick={() => navigate("/register")}
            >
              CREATE ACCOUNT
            </button>
            <button
              type="button"
              className="action-sub-link"
              onClick={() => navigate("/forgot-password")}
            >
              NEED HELP?
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default Login;