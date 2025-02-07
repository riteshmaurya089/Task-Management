const  TaskModel= require("../models/TaskModel");
const Joi = require("joi");

// Validate schema
const taskValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean(),
});

// Get all tasks
 const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Create a new task
 const createTask = async (req, res) => {
  try {
    const { error } = taskValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { title, description, completed } = req.body;
    const task = new TaskModel({ title, description, userId: req.userId, completed });
    await task.save();

    res.status(201).json({ message: "Added successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating tasks" });
  }
};

// Delete a task
 const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await TaskModel.findOneAndDelete({ _id: taskId, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

// Update a task
 const updateTask = async (req, res) => {
  try {
    const { error } = taskValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { title, description, completed } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Toggle task completion status
 const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTasks, createTask, deleteTask, updateTask, toggleTaskCompletion };