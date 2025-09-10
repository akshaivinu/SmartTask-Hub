import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const userId = req.user._id;

    if (!title || !description || !status || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      status !== "pending" &&
      status !== "in-progress" &&
      status !== "completed"
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.create({ user: userId,title, description, status, dueDate });

    res.status(201).json({ message: "Task created successfully", data: task });
  } catch (error) {
    console.log("Error creating task", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.log("Error getting tasks", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Task id is required" });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ data: task });
  } catch (error) {
    console.log("Error getting task", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, status, dueDate } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Task id is required" });
    }
    if (
      status !== "pending" &&
      status !== "in-progress" &&
      status !== "completed"
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const task = await Task.findByIdAndUpdate(id, {
      title,
      description,
      status,
      dueDate,
    }, { new: true });
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", data: task });
  } catch (error) {
    console.log("Error updating task", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Task id is required" });
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error deleting task", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
