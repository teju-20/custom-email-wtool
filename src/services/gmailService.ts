import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// OAuth2 client setup using your .env variables
const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);

// Set your refresh token
oAuth2Client.setCredentials({
  refresh_token: process.env.EMAIL_PASS // Or if you have a separate refresh token, use it here
});

// Gmail API instance
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export const fetchEmails = async () => {
  try {
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10, // fetch latest 10 emails
      labelIds: ["INBOX"],
    });

    const messages = res.data.messages || [];

    const emailDetails = await Promise.all(
      messages.map(async (msg) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: msg.id!,
        });

        const headers = email.data.payload?.headers || [];
        const from = headers.find((h) => h.name === "From")?.value || "";
        const subject = headers.find((h) => h.name === "Subject")?.value || "";
        const snippet = email.data.snippet || "";

        return {
          id: msg.id,
          from,
          subject,
          snippet,
        };
      })
    );

    return emailDetails;
  } catch (error) {
    console.error("Gmail fetch error:", error);
    throw error;
  }
};
