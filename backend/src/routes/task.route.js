import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/get", getTasks);
router.post("/create", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.delete("/delete-all", deleteAllTasks);

export default router;
