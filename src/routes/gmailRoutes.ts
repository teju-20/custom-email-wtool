import { Router } from "express";
import { fetchEmails } from "../controllers/GmailController";

const router = Router();

// Fetch inbox emails
router.get("/emails", fetchEmails);

export default router;
