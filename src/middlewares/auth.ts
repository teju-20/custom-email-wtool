import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface authRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = (req: authRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; email: string };
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
export { Request };

