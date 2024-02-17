const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

let authToken = "";
let notAuthorized = "";

async function loginUser(email, password) {
  const requestPath = "/auth/login";
  console.log(`Requesting: POST ${api.defaults.baseURL}${requestPath}`);
  console.log("Request body:", { email, password });
  try {
    const response = await api.post(requestPath, { email, password });
    authToken = response.data.token;
    console.log("Login Success:", response.data);
  } catch (error) {
    console.error("Login Error:", error.response.data);
  }
}

async function fetchUserProfile() {
  const requestPath = "/users/profile";
  console.log(`Requesting: GET ${api.defaults.baseURL}${requestPath}`);
  try {
    const response = await api.get(requestPath, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("Profile Data:", response.data);
  } catch (error) {
    console.error("Error Fetching Profile:", error.response.data);
  }
}

async function updateUserProfile(updates) {
  const requestPath = "/users/profile";
  console.log(`Requesting: PUT ${api.defaults.baseURL}${requestPath}`);
  console.log("Request body:", updates);
  try {
    const response = await api.put(requestPath, updates, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("Updated Profile:", response.data);
  } catch (error) {
    console.error("Error Updating Profile:", error.response.data);
  }
}

async function deleteUserAccount() {
  const requestPath = "/users/profile";
  console.log(`Requesting: DELETE ${api.defaults.baseURL}${requestPath}`);
  try {
    const response = await api.delete(requestPath, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("Delete Account:", response.data);
  } catch (error) {
    console.error("Error Deleting Account:", error.response.data);
  }
}

async function run() {
  await loginUser("williamsjacqueline@perez.net", "password123");
  await fetchUserProfile();
  await updateUserProfile({ username: "NewtestUsername" });
  await fetchUserProfile();
  await deleteUserAccount();
}

run();
