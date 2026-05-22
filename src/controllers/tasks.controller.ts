import { Router, Response } from "express";
import { ZodError } from "zod";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { tasksService } from "../container";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";

export const tasksRouter = Router();

tasksRouter.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const tasks = await tasksService.getAllTasks(req.userId!);

      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Internal server error",
      });
    }
  },
);

tasksRouter.get(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const task = await tasksService.getTaskById(req.params.id as string);

      if (!task)
        return res.status(404).json({ message: "Task não encontrada" });

      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error ? err.message : "Erro interno do servidor",
      });
    }
  },
);

tasksRouter.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const body = createTaskSchema.parse(req.body);
      const task = await tasksService.createTask({
        ...body,
        userId: req.userId!,
      });

      res.status(201).json(task);
    } catch (err) {
      if (err instanceof ZodError)
        return res.status(400).json({ errors: err.issues });

      res
        .status(400)
        .json({ message: err instanceof Error ? err.message : "Bad request" });
    }
  },
);

tasksRouter.put(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const body = updateTaskSchema.parse(req.body);
      const task = await tasksService.updateTask(
        req.params.id as string,
        req.userId!,
        body,
      );

      if (!task)
        return res.status(404).json({ message: "Task não encontrada" });

      res.status(200).json(task);
    } catch (err) {
      if (err instanceof ZodError)
        return res.status(400).json({ errors: err.issues });

      res
        .status(400)
        .json({ message: err instanceof Error ? err.message : "Bad request" });
    }
  },
);

tasksRouter.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      await tasksService.deleteTask(req.params.id as string, req.userId!);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error ? err.message : "Erro interno do servidor",
      });
    }
  },
);
