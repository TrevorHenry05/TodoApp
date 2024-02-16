# Todo List Full-Stack Application

## Overview

This project is a full-stack application featuring a React-based frontend and a Node.js/Express backend, designed to manage daily tasks efficiently.

## Getting Started

### Prerequisites

- Node.js (version X or above)
- npm (version X or above) or yarn

### Installation

#### Backend Setup

Navigate to the backend directory and install dependencies:

cd todo-list-backend
npm install

To start the server:
npm start

#### Frontend Setup

Navigate to the frontend directory and install dependencies:
cd todo-list-frontend
npm install

To start the React development server:
npm start

## API Documentation

### User Management

- **GET** `/api/users/profile`: Fetch the current user's profile.
- **PUT** `/api/users/profile`: Update the current user's profile.

### Task Management

- **GET** `/api/tasks`: List all user tasks.
- **GET** `/api/tasks/{id}`: Get a specific task.
- **POST** `/api/tasks`: Create a new task.
- **PUT** `/api/tasks/{id}`: Update an existing task.
- **DELETE** `/api/tasks/{id}`: Delete an existing task.

### User Auth

- **POST** `/api/auth/login`: Login the user.
- **POST** `/api/auth/register`: Register a new user.

## Frontend Features

- User registration and authentication.
- Task creation, editing, and deletion.
- Responsive design for mobile and desktop.
