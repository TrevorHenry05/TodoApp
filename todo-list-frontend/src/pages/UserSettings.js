import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";

function UserSettings() {
  const [userSettings, setUserSettings] = useState({
    email: "",
    password: "",
    username: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserSettings((prevState) => ({
          ...prevState,
          email: data.email,
          username: data.username,
        }));
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  const handleChange = (e) => {
    setUserSettings({ ...userSettings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = { ...userSettings };
    if (!submittedData.password) {
      delete submittedData.password;
    }

    fetch(`${API_URL}/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submittedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Settings updated successfully");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-4">
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={userSettings.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userSettings.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userSettings.password}
            onChange={handleChange}
          />
          <div id="passwordHelp" className="form-text">
            Leave blank to keep the current password.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Settings
        </button>
      </form>
    </div>
  );
}

export default UserSettings;
