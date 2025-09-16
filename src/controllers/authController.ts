import { Request, Response } from 'express';
import { oauth2Client } from '../utils/google0auth';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';

export const login = (req: Request, res: Response): void => {
  res.json({ message: 'Login successful' });
};

export const handleGoogleCallback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ message: 'Code not provided' });
    return;
  }

  try {
    // Get tokens from Google
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data } = await oauth2.userinfo.get();

    if (!data.email) {
      res.status(400).json({ message: 'Email not found in Google profile' });
      return;
    }

    // Find or create user
    let user = await User.findOne({ email: data.email });
    const expiryDate = tokens.expiry_date ? new Date(tokens.expiry_date) : new Date(Date.now() + 3600 * 1000);

    if (!user) {
      user = new User({
        email: data.email,
        accessToken: tokens.access_token ?? '',
        refreshToken: tokens.refresh_token ?? '',
        tokenExpiry: expiryDate,
      });
    } else {
      user.accessToken = tokens.access_token ?? user.accessToken;
      user.refreshToken = tokens.refresh_token ?? user.refreshToken;
      user.tokenExpiry = expiryDate;
    }

    await user.save();

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({ accessToken: jwtToken, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ message: 'OAuth callback error', error });
  }
};
