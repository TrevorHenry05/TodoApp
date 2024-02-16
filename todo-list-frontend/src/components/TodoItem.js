import React, { useState } from "react";
import { API_URL } from "../constants";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEdit = () => {
    if (isEditing) {
      fetch(`${API_URL}/api/tasks/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...todo,
          title: editedTitle,
          description: editedDescription,
        }),
      })
        .then((res) => res.json())
        .then((updatedTodo) => {
          onUpdate(updatedTodo);
          setIsEditing(false);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      setIsEditing(true);
    }
  };

  const handleComplete = () => {
    fetch(`${API_URL}/api/tasks/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => onUpdate(updatedTodo))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="card mt-2">
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="form-control mt-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>
            <h5
              className={`card-title ${
                todo.completed ? "text-decoration-line-through" : ""
              }`}
            >
              {todo.title}
            </h5>
            <p className="card-text">{todo.description}</p>
          </>
        )}
        <button className="btn btn-secondary me-2" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="btn btn-info me-2" onClick={handleComplete}>
          {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
