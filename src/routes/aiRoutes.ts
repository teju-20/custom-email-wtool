import { Router } from "express";
import { generateAIReply } from "../controllers/aiController";

const router = Router();

// ✅ Generate AI reply
router.post("/reply", generateAIReply);

export default router;
