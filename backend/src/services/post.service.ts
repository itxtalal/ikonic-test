import { Post, User } from '@prisma/client';
import prisma from '../config/prisma';
import { CreatePostRequest } from '../interfaces/post.interface';

export default class PostService {
  public findAllPublishedPosts = async (): Promise<Post[]> => {
    return prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  };

  public findPostById = async (id: number): Promise<Post | null> => {
    return prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  };

  public findPostsByUser = async (user: User): Promise<Post[]> => {
    return prisma.post.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  };

  public createPost = async (postData: CreatePostRequest): Promise<Post> => {
    return prisma.post.create({
      data: postData,
    });
  };

  public updatePost = async (
    id: number,
    postData: Partial<Post>
  ): Promise<Post | null> => {
    return prisma.post.update({
      where: {
        id,
      },
      data: postData,
    });
  };

  public deletePost = async (id: number): Promise<Post | null> => {
    return prisma.post.delete({
      where: {
        id,
      },
    });
  };
}
