import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import emailRoutes from "./routes/emailRoutes";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes";
import gmailRoutes from "./routes/gmailRoutes";

dotenv.config();

const app = express();

app.use("/api/gmail", gmailRoutes);

app.use("/api", aiRoutes);

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Health check
app.get("/api", (_req, res) => {
  res.send("✅ API is working!");
});

// Mount email routes
app.use("/api", emailRoutes);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
