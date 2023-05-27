import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import {
  AuthenticatedUserRequest,
  CreateUserRequest,
} from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../config';

export default class UserController {
  public userService: UserService = new UserService();

  public register = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserRequest = request.body;
      const user = await this.userService.register(userData);
      response.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userData = request.body;
      const user = await this.userService.login(userData);

      if (user) {
        // Generate JWT token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          SECRET_KEY!,
          { expiresIn: '1h' }
        );
        response.status(200).json({
          message: 'Logged in successfully',
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token,
        });
        response.setHeader('Authorization', `Bearer ${token}`);
      } else {
        response.status(401).json({ message: 'UnAuthorized' });
      }
    } catch (error) {
      next(error);
    }
  };

  public logout = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.setHeader('Authorization', '');
      response.status(200).json({ message: 'Logged out' });
    } catch (error) {
      next(error);
    }
  };

  public getAllUsers = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.userService.getAllUsers();
      response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const user = await this.userService.getUserById(Number(id));
      if (user) {
        response.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        });
      } else {
        response.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserRequest = request.body;
      const newUser = await this.userService.createUser(userData);
      response.status(201).json({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public createAdminUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserRequest = request.body;
      const newUser = await this.userService.createUser({
        ...userData,
        role: 'admin',
      });
      response.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    request: AuthenticatedUserRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const userData = request.body;

      delete userData.id;

      const user = request.user;

      if (user.role !== 'admin' && user.id !== Number(id)) {
        return response.status(401).json({ message: 'UnAuthorized' });
      }

      if (user.role === 'user') {
        delete userData.role;
      }

      if (userData.password) {
        // Hash password
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      const updatedUser = await this.userService.updateUser(
        Number(id),
        userData
      );

      if (updatedUser) {
        const { id, email, name, role } = updatedUser;
        response.status(200).json({
          message: 'User updated successfully',
          user: { id, email, name, role },
        });
      } else {
        response.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    request: AuthenticatedUserRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;

      const user = request.user;

      if (user.role !== 'admin' && user.id !== Number(id)) {
        return response.status(401).json({ message: 'UnAuthorized' });
      }

      const deletedUser = await this.userService.deleteUser(Number(id));
      if (deletedUser) {
        return response.status(200).json({ message: 'User deleted' });
      } else {
        return response.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}
