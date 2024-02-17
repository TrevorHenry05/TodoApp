const axios = require("axios");

const baseURL = "http://localhost:3000/api/auth";

async function registerUser(username, email, password) {
  const registerEndpoint = `${baseURL}/register`;
  try {
    console.log(`Requesting: POST ${registerEndpoint}`);
    console.log("Request body:", { username, email, password });

    const response = await axios.post(registerEndpoint, {
      username,
      email,
      password,
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

async function loginUser(email, password) {
  const loginEndpoint = `${baseURL}/login`;
  try {
    console.log(`Requesting: POST ${loginEndpoint}`);
    console.log("Request body:", { email, password });

    const response = await axios.post(loginEndpoint, {
      email,
      password,
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

async function testAuth() {
  await registerUser("testuser", "test@example.com", "password123");
  await loginUser("test@example.com", "password123");
  await loginUser("test@example.com", "wrongpassword");
}

testAuth();
