import { Router, Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { UsersRepository } from "../repositories/users.repository";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

export const usersRouter = Router();

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
