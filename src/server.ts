import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import emailRoutes from "./routes/emailRoutes";

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// JSON middleware
app.use(express.json());

// API Routes
app.use("/api/emails", emailRoutes);

// Health check
app.get("/api", (_req: Request, res: Response) => res.send("✅ API is working!"));

// Serve React build
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// Redirect non-API requests to React app
app.get(/^\/(?!api).*/, (_req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Global error handler:", err.stack || err);
  res.status(500).json({ message: "Internal Server Error" });
});

// MongoDB connection
const mongoUri = process.env.MONGO_URI || "";
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
