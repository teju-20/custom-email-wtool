import { Request, Response } from "express";
import { google } from "googleapis";
import { oauth2Client } from "../utils/google0auth";

// Fetch latest emails from Gmail
export const fetchEmails = async (req: Request, res: Response) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const messagesList = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
      labelIds: ["INBOX"],
    });

    if (!messagesList.data.messages) return res.json([]);

    const emails = await Promise.all(
      messagesList.data.messages.map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: msg.id!,
        });

        const headers = message.data.payload?.headers || [];
        const fromHeader = headers.find((h) => h.name === "From")?.value || "";
        const subjectHeader = headers.find((h) => h.name === "Subject")?.value || "";
        const snippet = message.data.snippet || "";

        return {
          id: msg.id,
          from: fromHeader,
          subject: subjectHeader,
          snippet,
        };
      })
    );

    res.json(emails);
  } catch (err) {
    console.error("Gmail fetch error:", err);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
};
