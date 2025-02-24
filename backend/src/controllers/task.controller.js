import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    // Fetch all tasks created by the user
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error in getTasks controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required." });
    }

    // Create a new task
    const newTask = new Task({ task });
    // Save the task to the database
    await newTask.save();

    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

import Task from "../models/Task.js"; // Assuming you have a Task model

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task content is required." });
    }

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(id);

    // Check if task exists
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({}); // Delete all tasks

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No tasks found to delete." });
    }

    return res.status(200).json({ message: "All tasks deleted successfully." });
  } catch (error) {
    console.error("Error deleting all tasks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
