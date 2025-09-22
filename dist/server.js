"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)());
// JSON middleware
app.use(express_1.default.json());
// API Routes
app.use("/api/emails", emailRoutes_1.default);
// Health check
app.get("/api", (_req, res) => res.send("✅ API is working!"));
// Serve React build
const buildPath = path_1.default.join(__dirname, "../frontend/build");
app.use(express_1.default.static(buildPath));
app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path_1.default.join(buildPath, "index.html"));
});
// Global error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
// MongoDB connection
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
