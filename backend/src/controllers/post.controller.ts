import { NextFunction, Request, Response } from 'express';
import PostService from '../services/post.service';
import { AuthenticatedUserRequest } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../config';
import { Post } from '@prisma/client';

export default class UserController {
  public postService: PostService = new PostService();

  public getAllPublishedPosts = async (
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const posts = await this.postService.findAllPublishedPosts();
      res.status(200).json({ posts: posts });
    } catch (error) {
      next(error);
    }
  };

  public getPostsByUser = async (
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      const posts = await this.postService.findPostsByUser(user);
      res.status(200).json({ posts: posts });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const post = await this.postService.findPostById(Number(id));
      res.status(200).json({ post: post });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, content, published } = req.body;

      const postData = {
        title: title,
        content: content,
        published: published ? JSON.parse(published) : false,
        authorId: req.user.id,
      };

      const post = await this.postService.createPost(postData);
      res.status(201).json({ post: post });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const { title, content, published } = req.body;

      if (!title || !content) {
        throw new Error('Missing title or content');
      }

      const postData: Partial<Post> = {
        title: title,
        content: content,
        published: JSON.parse(published),
      };

      // find if post is by user, then update
      const post = await this.postService.findPostById(Number(id));

      if (!post) {
        throw new Error('Post not found');
      }

      if (post.authorId !== req.user.id && req.user.role !== 'admin') {
        throw new Error('You are not authorized to update this post');
      }

      const updatedPost = await this.postService.updatePost(
        Number(id),
        postData
      );

      res.status(200).json({
        message: 'Post updated successfully',
        post: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      const post = await this.postService.deletePost(Number(id));

      if (!post) {
        throw new Error('Post not found');
      }

      if (post.authorId !== req.user.id && req.user.role !== 'admin') {
        throw new Error('You are not authorized to delete this post');
      }

      res.status(200).json({
        message: 'Post deleted successfully',
        post: post,
      });
    } catch (error) {
      next(error);
    }
  };
}
