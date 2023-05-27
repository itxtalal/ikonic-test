export interface CreatePostRequest {
  title: string;
  content?: string;
  authorId: number;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  published?: boolean;
}
