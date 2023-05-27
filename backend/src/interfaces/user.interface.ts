import { User } from '@prisma/client';
import { Request } from 'express';

export interface CreateUserRequest {
  email: string;
  password: string;
  role?: string;
  name?: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
  role?: string;
}

export interface AuthenticatedUserRequest extends Request {
  user?: any;
}
