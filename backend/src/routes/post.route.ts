import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import PostController from '../controllers/post.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/rbac.middleware';

export class PostRouter {
  public path: string = '/post';
  public router: Router;
  private controller: PostController;

  constructor() {
    this.router = Router();
    this.controller = new PostController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all posts
    this.router.get(
      `${this.path}/all`,
      authenticateJWT,
      this.controller.getAllPosts
    );

    // Get all posts by user
    this.router.get(
      `${this.path}/`,
      authenticateJWT,
      this.controller.getPostsByUser
    );

    // Get a specific post by ID
    this.router.get(
      `${this.path}/:id`,
      authenticateJWT,
      this.controller.getPostById
    );

    // Create a new post
    this.router.post(
      `${this.path}/`,
      authenticateJWT,
      this.controller.createPost
    );

    // Update a post by ID
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      this.controller.updatePost
    );

    // Delete a post by ID
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      this.controller.deletePost
    );
  }
}

export default PostRouter;
