const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Task = require("./models/task");

mongoose
  .connect("mongodb://localhost:27017/todolist")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const insertData = async () => {
  try {
    const usersData = JSON.parse(
      fs.readFileSync("./test_data/users.json", "utf8")
    );
    const insertedUsers = [];
    for (let userData of usersData) {
      const insertedUser = await User.create(userData);
      insertedUsers.push(insertedUser);
    }

    const tasksData = JSON.parse(
      fs.readFileSync("./test_data/tasks.json", "utf8")
    );

    const updatedTasksData = tasksData.map((task, index) => {
      const userId = insertedUsers[index % insertedUsers.length]._id;
      return { ...task, userId };
    });

    for (let taskData of updatedTasksData) {
      await Task.create(taskData);
    }

    console.log("Data insertion complete");
    process.exit();
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
};

insertData();
