require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireAuth = require("./middlewares/requireAuth");
const taskRoutes = require("./routes/taskManagementService");
const userAuthRoutes = require("./routes/userAuthService");
const userManagementRoutes = require("./routes/userManagementService");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", userAuthRoutes);

app.use(requireAuth);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userManagementRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

module.exports = app;
