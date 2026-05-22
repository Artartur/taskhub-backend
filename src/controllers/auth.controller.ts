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
    const { token } = await authService.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

authRouter.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
