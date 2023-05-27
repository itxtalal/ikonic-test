import React, { useEffect } from 'react'
import { userSelector } from '../../redux/slices/userSlice'
import { useAppSelector } from '../../redux/hooks'
import axios from '../../config/axios'
import Post, { PostType } from './Post'
import { Link } from 'react-router-dom'

const Posts = () => {
  const user = useAppSelector(userSelector)
  const [posts, setPosts] = React.useState([])

  const getPosts = async () => {
    const res = await axios.get('/post/allPublishedPosts')

    if (res.status === 200) {
      console.log(res.data)
      setPosts(() => res.data.posts)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="">
      <Link
        to="/newPost"
        className="bg-primary-500 text-white py-4 px-2 rounded-lg hover:bg-primary-600 flex items-center justify-center text-center w-full lg:w-1/4 mx-auto"
      >
        Create a New Post
      </Link>
      <h1 className="text-4xl font-bold">Posts</h1>

      <div className="flex flex-col gap-3">
        {posts.map((post: PostType) => (
          <Post
            post={post}
            ownPost={Number(user.id) === Number(post.authorId)}
          />
        ))}
      </div>
    </div>
  )
}

export default Posts
