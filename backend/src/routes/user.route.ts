import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { IRoute } from '../interfaces/route.interface';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/rbac.middleware';

class UserRoute implements IRoute {
  public path: string = '/user';
  public router: Router;
  public controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Register a new user
    this.router.post(`${this.path}/register`, this.controller.register);

    // Log in an existing user
    this.router.post(`${this.path}/login`, this.controller.login);

    this.router.post(`${this.path}/me`, this.controller.checkToken);

    // Log out a user (optional)
    this.router.post(`${this.path}/logout`, this.controller.logout);

    // Get all Users
    this.router.get(
      this.path,
      authenticateJWT,
      authorizeRole(['admin']),
      this.controller.getAllUsers
    );

    // create admin user
    this.router.post(
      `${this.path}/admin`,
      authenticateJWT,
      authorizeRole(['admin']),
      this.controller.createAdminUser
    );

    // CRUD on User
    this.router.post(
      this.path,
      authenticateJWT,
      authorizeRole(['admin']),
      this.controller.createUser
    );

    this.router.get(
      `${this.path}/:id`,
      authenticateJWT,
      this.controller.getUserById
    );
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      this.controller.updateUser
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      this.controller.deleteUser
    );
  }
}

export default UserRoute;
