import { Request, Response } from "express";

export const fetchEmails = async (_req: Request, res: Response) => {
  try {
    // Dummy emails for testing
    const emails = [
      {
        id: "1",
        from: "alice@example.com",
        subject: "Hello!",
        snippet: "Hi, how are you?",
        date: "2025-09-16",
      },
      {
        id: "2",
        from: "bob@example.com",
        subject: "Meeting",
        snippet: "Can we schedule a meeting?",
        date: "2025-09-15",
      },
    ];
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
};
