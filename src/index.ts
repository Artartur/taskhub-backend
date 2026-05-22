import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./controllers/auth.controller";
import { tasksRouter } from "./controllers/tasks.controller";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: String(process.env.FRONTEND_URL) || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

startServer();
