import { google, gmail_v1 } from 'googleapis';
import User from '../models/User';

export const getGmailClientForUser = async (userId: string): Promise<gmail_v1.Gmail> => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const oauth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID!,
    process.env.OAUTH_CLIENT_SECRET!,
    process.env.OAUTH_REDIRECT_URI!
  );

  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
    expiry_date: user.tokenExpiry.getTime(),
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
};
