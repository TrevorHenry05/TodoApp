import React, { useState, useEffect } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { API_URL } from "../constants";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (todoId) => {
    fetch(`${API_URL}/api/tasks/${todoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== todoId));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default TodoPage;
