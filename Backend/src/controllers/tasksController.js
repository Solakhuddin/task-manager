import { prisma } from "../config/db.js";
import { addTaskSchema } from "../validators/TaskValidator.js";

const addTask = async (req, res) => {
  const validation = addTaskSchema.safeParse(req.body);

  console.log("Received task data:", req.body); // Debugging log

  if (!validation.success) {
    return res.status(400).json({ message: validation.error.errors[0].message });
  }

  const { status, dueDate } = validation.data;

  if(req.body.dueDate < new Date().toISOString()) {
    return res.status(400).json({ message: "Due date cannot be in the past" });
  }

  try {
    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        status: status || "Pending",
        userId: req.user.id,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null // 
      }
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  } 
};

const getTasks = async (req, res) => {
  const tasks = await prisma.tasks.findMany(
    { where: { userId: req.user.id } }
  );
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await prisma.tasks.findUnique({
    where: { id: parseInt(id), userId: req.user.id }
  });
  res.json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  if(dueDate < new Date().toISOString()) {
    return res.status(400).json({ message: "Due date cannot be in the past" });
  }

  try {
    const task = await prisma.tasks.update({
      where: { id: parseInt(id), userId: req.user.id },
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null
      }
    });
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tasks.delete({
      where: { id: parseInt(id), userId: req.user.id }
    });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export { addTask, getTasks, getTaskById, updateTask, deleteTask };