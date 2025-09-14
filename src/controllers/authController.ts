import { Request, Response } from 'express';
import { oauth2Client } from '../utils/google0auth';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';

export const handleGoogleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) return res.status(400).json({ message: 'Code not provided' });

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data } = await oauth2.userinfo.get();

    let user = await User.findOne({ email: data.email });
    if (!user) {
      user = new User({
        email: data.email,
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token!,
        tokenExpiry: new Date(Date.now() + (tokens.expiry_date ?? 3600) * 1000),
      });
    } else {
      user.accessToken = tokens.access_token!;
      user.refreshToken = tokens.refresh_token!;
      user.tokenExpiry = new Date(Date.now() + (tokens.expiry_date ?? 3600) * 1000);
    }
    await user.save();

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });

    res.json({ accessToken: jwtToken, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'OAuth callback error', error });
  }
};
