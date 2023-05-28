import React, { useEffect } from 'react'
import { userSelector } from '../redux/slices/userSlice'
import { useAppSelector } from '../redux/hooks'
import axios from '../config/axios'
import Post, { PostType } from '../components/Post/Post'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../layout/Header'
import checkAuthToken from '../hooks/checkAuth'
import EditPost from '../components/Post/EditPost'
import Layout from '../layout/Layout'

const PostDetails = () => {
  const user = useAppSelector(userSelector)
  const [post, setPost] = React.useState<PostType | null>(null)
  const { id } = useParams()
  const [isEditing, setIsEditing] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  checkAuthToken()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const getPost = async () => {
    const res = await axios.get('/post/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

    if (res.status === 200) {
      console.log(res.data)
      setPost(() => res.data.post)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  const deleteHandler = async () => {
    try {
      const res = await axios.delete('/post/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      if (res.status === 200) {
        console.log('Post deleted successfully')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl font-bold">Post</h1>

        {user.role === 'admin' || Number(user.id) === Number(post?.authorId) ? (
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="bg-primary-300 text-white px-4 py-1 rounded-md"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>

            <button
              onClick={() => setIsDeleting((prev) => !prev)}
              className="bg-red-500 text-white px-4 py-1 rounded-md"
            >
              {isDeleting ? 'Cancel' : 'Delete'}
            </button>
          </div>
        ) : null}

        {post ? (
          <>
            {isDeleting ? (
              <div className="flex flex-col gap-2 border-2 border-gray-400 p-5 my-4">
                <h2 className="text-3xl font-semibold py-2 text-center">
                  Are you sure you want to delete this post?
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setIsDeleting(false)}
                    className="bg-primary-300 text-white px-5 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteHandler}
                    className="bg-red-500 text-white px-5 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null}

            {isEditing ? (
              <EditPost
                post={post}
                setPost={setPost}
                setIsEditing={setIsEditing}
              />
            ) : (
              <Post
                post={post}
                ownPost={Number(user.id) === Number(post.authorId)}
              />
            )}
          </>
        ) : null}
      </div>
    </Layout>
  )
}

export default PostDetails
