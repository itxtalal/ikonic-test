export interface CreatePostRequest {
  title: string;
  content?: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  published?: boolean;
}
