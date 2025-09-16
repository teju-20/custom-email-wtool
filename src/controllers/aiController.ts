import { Request, Response } from "express";

// For production, integrate OpenAI API here
export const generateAIReply = async (req: Request, res: Response) => {
  const { emailContent } = req.body;

  if (!emailContent) return res.status(400).json({ message: "Email content missing" });

  // Example placeholder reply
  const aiReply = `Hello, thank you for your email. Regarding: "${emailContent}"`;

  return res.json({ reply: aiReply });
};
