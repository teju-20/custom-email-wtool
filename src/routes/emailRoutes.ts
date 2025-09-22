import { Router, Request, Response, NextFunction } from "express";
import { fetchEmails, sendEmail } from "../controllers/emailController";

const router = Router();

// ✅ Fetch emails
router.get("/fetch-emails", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fetchEmails(req, res);
  } catch (error) {
    next(error);
  }
});

// ✅ Send email
router.post("/send-email", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sendEmail(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
