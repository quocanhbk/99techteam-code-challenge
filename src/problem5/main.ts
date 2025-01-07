import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", taskRoutes);

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Error connecting to database:", error);
  });
