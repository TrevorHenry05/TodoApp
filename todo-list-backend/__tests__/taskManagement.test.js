const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Task = require("../models/task");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

let token, userId;

// Setup a test user and obtain an authentication token
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const userResponse = await request(app).post("/api/auth/register").send({
    username: "TaskTester",
    email: "tasktester@example.com",
    password: "password123",
  });

  token = userResponse.body.token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  userId = decoded.userId;
});

afterAll(async () => {
  await Task.deleteMany({ userId });
  await User.deleteOne({ _id: userId });
  await mongoose.connection.close();
});

describe("Task Management Service", () => {
  let createdTaskId;

  test("POST /api/tasks - should create a new task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Test Description",
      completed: false,
    };
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(taskData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe(taskData.title);

    createdTaskId = response.body._id;
  });

  test("GET /api/tasks - should fetch all tasks for the authenticated user", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /api/tasks/:id - should fetch a single task by ID", async () => {
    const response = await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id", createdTaskId);
  });

  test("PUT /api/tasks/:id - should update the specified task", async () => {
    const updatedData = { title: "Updated Test Task", completed: true };
    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.completed).toBe(true);
  });

  test("DELETE /api/tasks/:id - should delete the specified task", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
