// frontend/src/api/emailApi.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
}

export interface SendEmailResponse {
  message: string;
}

// ✅ Fetch all emails
export const fetchEmails = async (): Promise<Email[]> => {
  const response = await axios.get<Email[]>(`${API_URL}/emails`);
  return response.data;
};

// ✅ Send an email
export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<SendEmailResponse> => {
  const response = await axios.post<SendEmailResponse>(
    `${API_URL}/send-email`,
    { to, subject, text }
  );
  return response.data;
};
