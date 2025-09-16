import { Router } from "express";
import { generateAIReply } from "../controllers/aiController";

const router = Router();

router.post("/ai-reply", generateAIReply);

export default router;
