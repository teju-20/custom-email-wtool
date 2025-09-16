import axios from "axios";

export interface SendEmailResponse {
  message: string;
}

export const sendEmail = async (to: string, subject: string, text: string): Promise<SendEmailResponse> => {
  const response = await axios.post<SendEmailResponse>("http://localhost:5000/api/send-email", { to, subject, text });
  return response.data;
};
