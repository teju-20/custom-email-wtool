import { Router } from "express";
import { fetchEmails } from "../controllers/emailController";

const router = Router();

// POST /api/send-email
// router.post("/send-email", sendEmail);

// GET /api/fetch-emails
router.get("/fetch-emails", fetchEmails);

export default router;
