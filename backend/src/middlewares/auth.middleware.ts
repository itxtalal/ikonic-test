import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedUserRequest } from '../interfaces/user.interface';
import { SECRET_KEY } from '../config';
import prisma from '../config/prisma';

// JWT Authentication Middleware
export const authenticateJWT = async (
  request: AuthenticatedUserRequest,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return response.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY!);

    // check in prisma
    const user = await prisma.user.findUnique({
      where: {
        id: (decoded as any).id,
      },
    });

    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    request.user = decoded;
    next();
  } catch (error) {
    return response.status(403).json({ message: 'Invalid token' });
  }
};
