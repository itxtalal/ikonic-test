import { NextFunction, Request, Response } from 'express';
import TestService from '../services/test.service';
import prisma from '../config/prisma';

export default class TestController {
  public testServices: TestService = new TestService();

  public getHello = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    response.status(200).send(this.testServices.sayHello('Ikonic'));
  };

  public getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id: number = parseInt(request.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    response.status(200).send(user);
  };

  public createUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = await prisma.user.create({
      data: {
        name: 'Ikonic',
        email: '',
      },
    });
    response.status(200).send(user);
  };
}
