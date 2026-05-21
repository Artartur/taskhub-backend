import { Router, Response } from "express";
import { TasksRepository } from "../repositories/tasks.repository";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { TasksService } from "../services/tasks.service";

const tasksRepository = new TasksRepository();
const tasksService = new TasksService(tasksRepository);

export const tasksRouter = Router();

tasksRouter.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const tasks = await tasksService.getAllTasks(req.userId!);

      res.status(200).json(tasks);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
);

tasksRouter.get(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const task = await tasksService.getTaskById(req.params.id);

      if (!task) return res.status(404).json({ message: "Task not found" });

      res.status(200).json(task);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
);

tasksRouter.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const task = await tasksService.createTask({
        ...req.body,
        userId: req.userId,
      });

      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
);

tasksRouter.put(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const task = await tasksService.updateTask(req.params.id, req.body);

      if (!task) return res.status(404).json({ message: "Task not found" });

      res.status(200).json(task);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
);

tasksRouter.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      await tasksService.deleteTask(req.params.id);

      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
);
