const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// POST endpoint to create a new task
router.post("/", async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const task = new Task({
      title,
      description,
      completed,
      userId: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET endpoint to fetch all tasks for a user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET endpoint to fetch a single task by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT endpoint to update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE endpoint to delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send("Task deleted successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
