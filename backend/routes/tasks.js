const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get("/user/:userId", async (req, res) => {
  try {
    console.log("Get all tasks----", req.params);

    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    console.log("Fetching tasks for user:", userId);

    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET specific task
router.get('/:userId/:taskId', async (req, res) => {
  try {
    console.log("Get a specific task----", req.params);
    
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE task
router.post('/', async (req, res) => {
  const task = new Task({
    userId: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate
  });

  console.log("Creating task:", task);
  
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE task
router.put('/:userId/:taskId', async (req, res) => {
  try {
    console.log("Update task----", req.params);
    
    let task = await Task.findOne({ _id: req.params.taskId, userId: req.params.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.status) task.status = req.body.status;
    if (req.body.dueDate) task.dueDate = req.body.dueDate;
    
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE task
router.delete('/:userId/:taskId', async (req, res) => {
  try {
    console.log("Delete task----", req.params);

    const task = await Task.findOne({ _id: req.params.taskId, userId: req.params.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;