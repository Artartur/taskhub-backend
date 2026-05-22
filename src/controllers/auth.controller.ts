import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { authService } from "../container";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);
    const { token } = await authService.login(body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: String(process.env.NODE_ENV) === "production",
      sameSite: String(process.env.NODE_ENV) === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logado com sucesso!" });
  } catch (err) {
    if (err instanceof ZodError)
      return res.status(400).json({ errors: err.issues });

    res
      .status(401)
      .json({ message: err instanceof Error ? err.message : "Não autorizado" });
  }
});

authRouter.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: String(process.env.NODE_ENV) === "production",
    sameSite: String(process.env.NODE_ENV) === "production" ? "none" : "strict",
    path: "/",
  });

  res.status(200).json({ message: "Deslogado com sucesso" });
});

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const body = registerSchema.parse(req.body);
    const user = await authService.register(body);

    res.status(201).json(user);
  } catch (err) {
    if (err instanceof ZodError)
      return res.status(400).json({ errors: err.issues });

    res
      .status(400)
      .json({ message: err instanceof Error ? err.message : "Bad request" });
  }
});
