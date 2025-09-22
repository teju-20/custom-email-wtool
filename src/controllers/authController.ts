import { Request, Response } from 'express';
import { oauth2Client } from '../utils/google0auth';
import User, { IUser } from '../models/user'; // Assume IUser interface is exported here
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';

export const login = (_req: Request, res: Response): void => {
  res.json({ message: 'Login successful' });
};

export const handleGoogleCallback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ message: 'Authorization code not provided' });
    return;
  }

  try {
    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user profile info with valid OAuth2 client
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data } = await oauth2.userinfo.get();

    if (!data.email) {
      res.status(400).json({ message: 'Email not found in Google profile' });
      return;
    }

    // Check if user exists in database
    let user: IUser | null = await User.findOne({ email: data.email });

    const expiryDate = tokens.expiry_date ? new Date(tokens.expiry_date) : new Date(Date.now() + 3600 * 1000);

    if (!user) {
      // Create new user document if not found
      const newUser = new User({
        email: data.email,
        accessToken: tokens.access_token ?? '',
        refreshToken: tokens.refresh_token ?? '',
        tokenExpiry: expiryDate,
      });

      user = await newUser.save();
    } else {
      // Update existing user tokens if provided
      user.accessToken = tokens.access_token ?? user.accessToken;
      user.refreshToken = tokens.refresh_token ?? user.refreshToken;
      user.tokenExpiry = expiryDate;
      await user.save();
    }

    // Create JWT token for client sessions
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({ accessToken: jwtToken, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ message: 'Error processing OAuth callback', error: error instanceof Error ? error.message : error });
  }
};
export const logout = (_req: Request, res: Response): void => {
  // Invalidate JWT token on client side (handled in frontend)
  res.json({ message: 'Logout successful' });
}