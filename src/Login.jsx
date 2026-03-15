import React, { useState } from "react";
import "./App.css";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://attendance-system-pl4x.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setLoggedIn(true);
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div className="login-logo">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="#9CD5FF" strokeWidth="1.8"/>
          <path d="M8 2v4M16 2v4" stroke="#9CD5FF" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M7 12h4M7 15.5h7" stroke="#7AAACE" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>

      <h2 className="login-heading">Attendance System</h2>
      <p className="login-subtitle">Sign in to your account to continue</p>

      <div className="login-demo">
        <strong>Demo credentials</strong><br />
        Username: <strong>teacher</strong> &nbsp;·&nbsp; Password: <strong>1234</strong>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="login-footer">Secure employee portal</p>
    </div>
  );
}

export default Login;