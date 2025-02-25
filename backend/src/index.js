import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.config.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.FRONTEND_URL);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json()); // Allow express to parse incoming JSON data
app.use(cookieParser()); // Allow express to parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
