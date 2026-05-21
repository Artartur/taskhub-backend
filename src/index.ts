import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { Database } from "./database/connection";
import { authRouter } from "./controllers/auth.controller";
import { usersRouter } from "./controllers/users.controller";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", usersRouter);

new Database()
  .connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
