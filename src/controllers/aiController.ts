import { Request, Response } from "express";

// Dummy AI reply generator (replace with OpenAI or GPT API later)
export const generateAIReply = async (req: Request, res: Response) => {
  try {
    const { emailContent } = req.body;

    if (!emailContent) {
      return res.status(400).json({ message: "Email content missing" });
    }

    // Dummy reply suggestion
    const reply = `Hello, thank you for your email. Regarding: "${emailContent}"`;

    res.json({ reply });
  } catch (error) {
    console.error("❌ Error generating AI reply:", error);
    res.status(500).json({ message: "Failed to generate AI reply" });
  }
};
