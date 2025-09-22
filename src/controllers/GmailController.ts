import { Request, Response } from "express";
import { fetchEmails } from "../services/gmailService";

export const getInbox = async (_req: Request, res: Response) => {
  try {
    const emails = await fetchEmails();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emails" });
  }
};
