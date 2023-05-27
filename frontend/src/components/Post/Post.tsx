import React from 'react'
import { Link } from 'react-router-dom'

export interface PostType {
  id: number
  title: string
  content?: string
  published: boolean
  authorId: number
  author: {
    name?: string
  }
}

const Post = ({ post, ownPost }: { post: PostType; ownPost: boolean }) => {
  return (
    <Link
      to={`/post/${post.id}`}
      key={post.id}
      className={`flex flex-col gap-4 border-2 ${
        ownPost ? 'border-primary-600' : 'border-gray-200'
      } rounded-md p-2 my-2`}
    >
      <h1 className="text-xl font-bold">{post.title}</h1>
      <p className="text-md">{post?.content}</p>
      <p className="text-sm font-semibold">
        Author Name: {post.author?.name ? post.author?.name : 'N/A'}
      </p>
    </Link>
  )
}

export default Post
