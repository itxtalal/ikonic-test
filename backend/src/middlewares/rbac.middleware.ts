import { Request, Response, NextFunction } from 'express';
import { AuthenticatedUserRequest } from '../interfaces/user.interface';

export const authorizeRole =
  (roles: string[]) =>
  (
    request: AuthenticatedUserRequest,
    response: Response,
    next: NextFunction
  ) => {
    // Assuming role information is stored in the decoded JWT payload
    const userRole = request.user.role;

    console.log('userRole', userRole);

    if (!roles.includes(userRole)) {
      return response.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
