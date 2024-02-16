import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          onLogin(data.token);
          navigate("/");
        } else {
          console.error("Login failed:", data.message);
          alert("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={navigateToRegister}
          >
            Don't have an account? Register here
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
