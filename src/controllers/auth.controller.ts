import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";
import { UsersRepository } from "../repositories/users.repository";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const authService = new AuthService(usersService);

export const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
