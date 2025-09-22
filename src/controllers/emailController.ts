import { Request, Response } from "express";

// 📩 Fetch emails (dummy)
export const fetchEmails = async (_req: Request, res: Response): Promise<void> => {
  try {
    const emails = [
      {
        id: "1",
        from: "test@example.com",
        subject: "Hello",
        snippet: "This is a test email.",
        date: new Date().toISOString(),
      },
      {
        id: "2",
        from: "bot@example.com",
        subject: "Update",
        snippet: "AI-powered workflow update.",
        date: new Date().toISOString(),
      },
    ];

    res.status(200).json(emails);
  } catch (error) {
    console.error("❌ Error fetching emails:", error);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
};

// 📤 Send email (dummy)
export const sendEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      res.status(400).json({ message: "Missing required fields: to, subject, or text" });
      return;
    }

    console.log(`📧 Sending email to: ${to}, Subject: ${subject}, Text: ${text}`);
    res.status(200).json({ message: "Email sent successfully (dummy)" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
