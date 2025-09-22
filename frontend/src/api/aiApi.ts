// frontend/src/api/aiApi.ts
import axios from "axios";

// Interface for Email object
export interface email {
  _id?: string;       // optional MongoDB id
  id?: string;        // optional id
  from?: string;
  to?: string;
  subject?: string;
  snippet?: string;
  text?: string;
  date?: string;
}

// Fetch emails from backend
export const fetchEmails = async (): Promise<email[]> => {
  const response = await axios.get<email[]>(
    "http://localhost:5000/api/fetch-emails" // ensure backend port matches
  );
  return response.data;
};

// Interface for AI reply response
export interface AIReplyResponse {
  reply: string;
}

// Get AI-generated reply for an email snippet/content
export const getAIReply = async (emailContent: string): Promise<string> => {
  const response = await axios.post<AIReplyResponse>(
    "http://localhost:5000/api/ai/reply", // backend AI endpoint
    { emailContent }
  );
  return response.data.reply;
};
