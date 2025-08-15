// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
import loginIllustration from "../assets/illustration.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle authentication
    // For now, we'll just navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="login-page__logo">
          <div className="login-page__logo-container">
            <div className="login-page__logo-icon">
              <img
                src="/src/assets/Union.png"
                alt="Login logo"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <span className="login-page__logo-text">lendsqr</span>
          </div>
        </div>
        <div className="login-page__image">
          <img
            src={loginIllustration}
            alt="Login illustration"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
      <div className="login-page__right">
        <form className="login-page__form" onSubmit={handleSubmit}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <div className="login-page__form-group">
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-page__form-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <a href="#" className="login-page__form-forgot">
            Forgotten Password?
          </a>

          <button type="submit" className="login-page__form-submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
