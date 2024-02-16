const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");

let token;

// Setup a test user and obtain an authentication token
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const userResponse = await request(app).post("/api/auth/register").send({
    username: "TestUser",
    email: "testuser@example.com",
    password: "password123",
  });

  token = userResponse.body.token;
});

afterAll(async () => {
  await User.deleteMany({ email: "testuser@example.com" });
  await mongoose.connection.close();
});

describe("User Management Service", () => {
  test("GET /api/users/profile - should fetch the authenticated user's profile", async () => {
    const response = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("email", "testuser@example.com");
  });

  test("PUT /api/users/profile - should update the authenticated user's profile", async () => {
    const response = await request(app)
      .put("/api/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "UpdatedTestUser" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("username", "UpdatedTestUser");
  });

  test("DELETE /api/users/profile - should delete the authenticated user's account", async () => {
    const response = await request(app)
      .delete("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("User deleted successfully");
  });
});
