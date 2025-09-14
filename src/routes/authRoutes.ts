// src/routes/emailRoutes.ts
import { Router, Request, Response } from "express";
import { sendEmail } from "../services/emailService";

const router = Router();

// Email interface
interface Email {
  id: number;
  subject: string;
  body: string;
  to?: string; // optional, for email sending
}

// In-memory email storage
let emails: Email[] = [
  { id: 1, subject: "Hello", body: "This is a test email", to: "test@example.com" },
];

// POST /emails - Add email and send it
router.post("/", async (req: Request, res: Response) => {
  const { subject, body, to } = req.body;

  if (!subject || !body || !to) {
    return res.status(400).json({ message: "To, subject, and body are required" });
  }

  const newEmail: Email = { id: Date.now(), subject, body, to };
  emails.push(newEmail);

  try {
    // Send the email
    await sendEmail(to, subject, body);
    res.status(201).json({ message: "Email sent successfully", email: newEmail });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
});

// GET /emails - Retrieve all emails
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(emails);
});