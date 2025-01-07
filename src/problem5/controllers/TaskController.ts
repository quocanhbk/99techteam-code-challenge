import { Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";

const taskRepository = AppDataSource.getRepository(Task);

export const TaskController = {
  // Create a new task
  create: async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const task = taskRepository.create({ title, description });
      await taskRepository.save(task);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ error: "Error creating task" });
    }
  },

  // List tasks with filters
  list: async (req: Request, res: Response) => {
    try {
      const { isCompleted, search } = req.query;

      let whereClause: any = {};

      if (isCompleted !== undefined) {
        whereClause.isCompleted = isCompleted === "true";
      }

      if (search) {
        whereClause = [
          { ...whereClause, title: ILike(`%${search}%`) },
          { ...whereClause, description: ILike(`%${search}%`) },
        ];
      }

      const tasks = await taskRepository.find({
        where: whereClause,
        order: { createdAt: "DESC" },
      });

      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching tasks" });
    }
  },

  // Get task by ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await taskRepository.findOne({ where: { id } });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.json(task);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching task" });
    }
  },

  // Update task
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, isCompleted } = req.body;

      const task = await taskRepository.findOne({ where: { id } });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (isCompleted !== undefined) task.isCompleted = isCompleted;

      await taskRepository.save(task);
      return res.json(task);
    } catch (error) {
      return res.status(500).json({ error: "Error updating task" });
    }
  },

  // Delete task
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await taskRepository.findOne({ where: { id } });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      await taskRepository.remove(task);
      return res.status(204).send(true);
    } catch (error) {
      return res.status(500).json({ error: "Error deleting task" });
    }
  },
};
