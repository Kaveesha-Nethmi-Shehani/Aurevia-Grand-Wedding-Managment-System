import jwt from 'jsonwebtoken';
import { UserRole } from '../types/enums';

export const generateToken = (userId: string, role: UserRole): string => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'royal_bliss_secret_fallback',
    { expiresIn: '30d' }
  );
};