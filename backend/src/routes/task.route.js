import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from "../controllers/task.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get", protectRoute, getTasks);
router.post("/create", protectRoute, createTask);
router.put("/update/:id", protectRoute, updateTask);
router.delete("/delete/:id", protectRoute, deleteTask);
router.delete("/delete-all", protectRoute, deleteAllTasks);

export default router;
