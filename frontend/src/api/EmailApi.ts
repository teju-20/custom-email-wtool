import axios from "axios";

export interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
}

export const fetchEmails = async (): Promise<Email[]> => {
  const response = await axios.get<Email[]>("http://localhost:5000/api/fetch-emails");
  return response.data;
};

export interface SendEmailResponse {
  message: string;
}

export const sendEmail = async (to: string, subject: string, text: string): Promise<SendEmailResponse> => {
  const response = await axios.post<SendEmailResponse>("http://localhost:5000/api/send-email", { to, subject, text });
  return response.data;
};
