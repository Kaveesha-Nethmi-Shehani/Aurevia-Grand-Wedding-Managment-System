import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/enums';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'royal_bliss_secret_fallback') as {
      userId: string;
      role: UserRole;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === UserRole.ADMIN) {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
  }
};