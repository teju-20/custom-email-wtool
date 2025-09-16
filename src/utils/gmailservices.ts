import { google } from "googleapis";
import { oauth2Client } from "./google0auth"; // your existing oauth2Client

export const getGmailMessages = async (accessToken: string) => {
  try {
    // Set credentials with the stored access token
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Fetch the latest 10 messages
    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    const messages = res.data.messages || [];

    const detailedMessages = [];

    for (const msg of messages) {
      const message = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "full",
      });

      const headers = message.data.payload?.headers || [];
      const subjectHeader = headers.find(h => h.name === "Subject");
      const fromHeader = headers.find(h => h.name === "From");
      const dateHeader = headers.find(h => h.name === "Date");

      // Get snippet
      const snippet = message.data.snippet || "";

      detailedMessages.push({
        id: msg.id,
        from: fromHeader?.value || "",
        subject: subjectHeader?.value || "",
        date: dateHeader?.value || "",
        snippet,
      });
    }

    return detailedMessages;
  } catch (error) {
    console.error("Gmail fetch error:", error);
    throw new Error("Failed to fetch emails");
  }
};
