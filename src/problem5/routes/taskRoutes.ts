import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();

// Create a new task
router.post("/tasks", TaskController.create);

// List tasks with filters
router.get("/tasks", TaskController.list);

// Get task by ID
router.get("/tasks/:id", TaskController.getById);

// Update task
router.put("/tasks/:id", TaskController.update);

// Delete task
router.delete("/tasks/:id", TaskController.delete);

export default router;
