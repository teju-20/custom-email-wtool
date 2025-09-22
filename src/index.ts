import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
// Base route: /api/emails
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
