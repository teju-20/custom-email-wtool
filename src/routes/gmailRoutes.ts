import express from "express";
import { getInbox } from "../controllers/GmailController";

const router = express.Router();

router.get("/inbox", getInbox);

export default router;
