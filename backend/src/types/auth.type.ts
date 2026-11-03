import { Request } from 'express';
import { UserRole } from './enums';

export interface IJwtPayload {
  userId: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: IJwtPayload;
}