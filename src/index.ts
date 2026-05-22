import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Database } from "./database/connection";
import { authRouter } from "./controllers/auth.controller";
import { tasksRouter } from "./controllers/tasks.controller";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

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

new Database()
  .connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
