import { Response } from 'express';
import { getGmailClientForUser } from '../services/gmailService';
import { Request } from '../middlewares/auth'; // Use extended interface

export const listEmails = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const gmail = await getGmailClientForUser(userId);

    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      labelIds: ['INBOX'],
    });

    const messages = response.data.messages || [];

    const detailedMessages = await Promise.all(
      messages.map(async (msg) => {
        const messageData = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id!,
          format: 'metadata',
          metadataHeaders: ['Subject', 'From', 'Date'],
        });

        return {
          id: msg.id,
          snippet: messageData.data.snippet,
          headers: messageData.data.payload?.headers,
        };
      })
    );

    res.json(detailedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch emails' });
  }
};
