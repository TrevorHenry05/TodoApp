// src/components/AddTodo.js
import React, { useState } from "react";
import { API_URL } from "../constants";

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, completed: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        onAdd(data);
        setTitle("");
        setDescription("");
        setShowForm(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        Add Todo
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Enter todo description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="btn btn-success">
            Create Todo
          </button>
        </form>
      )}
    </>
  );
};

export default AddTodo;
