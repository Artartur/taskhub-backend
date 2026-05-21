import "dotenv/config";
import express from "express";
import { Database } from "./database/connection";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

new Database()
  .connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
