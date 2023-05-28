import { User } from '@prisma/client';
import prisma from '../config/prisma';
import { CreateUserRequest } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

export default class UserService {
  public register = async (userData: CreateUserRequest): Promise<User> => {
    const password = userData.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    userData.password = hashedPassword;

    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  };

  public login = async (userData: CreateUserRequest): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (user) {
      const validPass = await bcrypt.compare(userData.password, user.password);

      if (validPass) {
        return user;
      }
    }

    return null;
  };

  public getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
  };

  public getOnlyUserUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({
      where: {
        role: 'user',
      },
    });
  };

  public getUserById = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  };

  public createUser = async (userData: CreateUserRequest): Promise<User> => {
    const password = userData.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  };

  public updateUser = async (
    id: number,
    userData: Partial<User>
  ): Promise<User | null> => {
    return prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });
  };

  public deleteUser = async (id: number): Promise<User | null> => {
    // Delete associated posts
    await prisma.post.deleteMany({
      where: {
        authorId: id,
      },
    });
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedUser;
  };
}
