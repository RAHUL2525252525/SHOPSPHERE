import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

// Icons
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20" /></svg>
);

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setIsError(false);
      setMessage("Registration successful");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setIsError(true);
      const serverMessage = error.response?.data;
      setMessage(
        typeof serverMessage === "string"
          ? serverMessage
          : serverMessage?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="shopsphere-theme-viewport">
      <div className="theme-backdrop" aria-hidden="true" />
      <main className="theme-auth-portal">
        <form onSubmit={handleSubmit} className="theme-auth-form">
          <div className="brand-header-group" style={{ marginBottom: "24px" }}>
            <div className="header-signal-arches">
              <span className="arch-1" /><span className="arch-2" />
            </div>
            <h1 className="brand-logo-text">REGISTER</h1>
          </div>

          {message && <div className="error-badge-pill" style={{ borderColor: isError ? "rgba(234, 67, 67, 0.35)" : "rgba(76, 175, 80, 0.35)", background: isError ? "rgba(234, 67, 67, 0.2)" : "rgba(76, 175, 80, 0.2)" }}>{message}</div>}

          <div className="input-pill-field">
            <div className="pill-field-icon"><UserIcon /></div>
            <input name="name" type="text" placeholder="Full Name..." value={formData.name} onChange={handleChange} required />
          </div>

          <div className="input-pill-field">
            <div className="pill-field-icon"><EmailIcon /></div>
            <input name="email" type="email" placeholder="Email Address..." value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-pill-field">
            <div className="pill-field-icon"><PhoneIcon /></div>
            <input name="phone" type="text" placeholder="Phone Number..." value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="input-pill-field">
            <div className="pill-field-icon"><LockIcon /></div>
            <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
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

          <button type="submit" className="submit-pill-action">Create Account</button>

          <div className="action-link-row">
            <button type="button" className="action-sub-link" onClick={() => navigate("/login")} style={{ width: "100%", textAlign: "center" }}>
              ALREADY HAVE AN ACCOUNT? LOGIN
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Register;
