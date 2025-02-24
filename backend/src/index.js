import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.config.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Allow express to parse incoming JSON data

app.use("/api/auth",authRoutes) 
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
