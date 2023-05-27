import React, { useEffect } from 'react'
import { userSelector } from '../../redux/slices/userSlice'
import { useAppSelector } from '../../redux/hooks'
import axios from '../../config/axios'
import Post, { PostType } from './Post'
import { Link } from 'react-router-dom'

const Posts = () => {
  const user = useAppSelector(userSelector)
  const [posts, setPosts] = React.useState([])
  const [filter, setFilter] = React.useState<
    'all' | 'published' | 'unpublished'
  >('all')
  const [filteredPosts, setFilteredPosts] = React.useState([])

  const getPublishedPosts = async () => {
    const res = await axios.get('/post/allPublishedPosts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

    if (res.status === 200) {
      console.log(res.data)
      setPosts(() => res.data.posts)
      setFilteredPosts(() => res.data.posts)
    }
  }

  const getPosts = async () => {
    const res = await axios.get('/post/all', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    if (res.status === 200) {
      console.log(res.data)
      setPosts(() => res.data.posts)
      setFilteredPosts(() => res.data.posts)
    }
  }

  useEffect(() => {
    if (user.role === 'admin') {
      if (filter === 'all') {
        setFilteredPosts(() => posts)
      } else if (filter === 'published') {
        const publishedPosts = posts.filter(
          (post: PostType) => post.published === true
        )
        setFilteredPosts(() => publishedPosts)
      } else if (filter === 'unpublished') {
        const unpublishedPosts = posts.filter(
          (post: PostType) => post.published === false
        )
        setFilteredPosts(() => unpublishedPosts)
      }
    }
  }, [filter])

  useEffect(() => {
    user.role === 'admin' ? getPosts() : getPublishedPosts()
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

      {user.role === 'admin' ? (
        <div className="my-4 w-1/4 ml-auto">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 "
          >
            Filter Posts
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'all' | 'published' | 'unpublished')
            }
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {filteredPosts.map((post: PostType) => (
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
