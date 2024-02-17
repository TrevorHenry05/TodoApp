const axios = require("axios");

const userApi = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

const tasksApi = axios.create({
  baseURL: "http://localhost:3000/api/tasks",
});

async function loginUser(email, password) {
  try {
    const response = await userApi.post("/login", { email, password });
    const { token } = response.data;
    console.log("Login Success:", response.data);
    return token;
  } catch (error) {
    console.error("Login Error:", error.response.data);
    return null;
  }
}

async function createTask(title, description, completed, token) {
  tasksApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(`Requesting: POST ${tasksApi.defaults.baseURL}/`);
  console.log("Request body:", { title, description, completed });
  try {
    const response = await tasksApi.post("/", {
      title,
      description,
      completed,
    });
    console.log("Task Created:", response.data);
    return response.data._id; // Return the ID of the created task
  } catch (error) {
    console.error("Create Task Error:", error.response.data);
    return null;
  }
}

async function fetchAllTasks(token) {
  console.log(`Requesting: GET ${tasksApi.defaults.baseURL}/`);
  try {
    const response = await tasksApi.get("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("All Tasks Data:", response.data);
  } catch (error) {
    console.error("Error Fetching All Tasks:", error.response.data);
  }
}

async function fetchTaskById(taskId, token) {
  console.log(`Requesting: GET ${tasksApi.defaults.baseURL}/${taskId}`);
  try {
    const response = await tasksApi.get(`/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Task Data:", response.data);
  } catch (error) {
    console.error("Error Fetching Task:", error.response.data);
  }
}

async function updateTask(taskId, updates, token) {
  console.log(`Requesting: PUT ${tasksApi.defaults.baseURL}/${taskId}`);
  console.log("Request body:", updates);
  try {
    const response = await tasksApi.put(`/${taskId}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Updated Task:", response.data);
  } catch (error) {
    console.error("Error Updating Task:", error.response.data);
  }
}

async function deleteTask(taskId, token) {
  console.log(`Requesting: DELETE ${tasksApi.defaults.baseURL}/${taskId}`);
  try {
    await tasksApi.delete(`/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Task Deleted Successfully");
  } catch (error) {
    console.error("Error Deleting Task:", error.response.data);
  }
}

async function run() {
  const email = "qfry@hotmail.com";
  const password = "password123";
  const token = await loginUser(email, password);

  if (token) {
    const taskId = await createTask(
      "New Task",
      "Description of the new task",
      false,
      token
    );
    await fetchAllTasks(token);
    if (taskId) {
      await fetchTaskById(taskId, token);
      await updateTask(
        taskId,
        { title: "Updated Task Title", completed: true },
        token
      );
      await deleteTask(taskId, token);
      await fetchAllTasks(token);
    }
  }
}

run();
