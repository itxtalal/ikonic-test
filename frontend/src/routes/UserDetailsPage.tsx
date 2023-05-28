import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'
import checkAuthToken from '../hooks/checkAuth'

import UserDetails from '../routes/UserDetails'
import axios from '../config/axios'
import Post, { PostType } from '../components/Post/Post'
import Layout from '../layout/Layout'

const UserDetailsPage = () => {
  const user = useAppSelector(userSelector)
  const { id } = useParams()
  const [userPosts, setUserPosts] = React.useState<PostType[]>([])

  checkAuthToken()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const getUserPosts = async () => {
    const res = await axios.get('/post/user/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

    if (res.status === 200) {
      setUserPosts(() => res.data.posts)
    }
  }

  useEffect(() => {
    getUserPosts()
  }, [user])

  if (user.id === '') return <div>Loading...</div>

  return (
    <Layout>
      <UserDetails />

      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold">Posts by User</h2>
        {userPosts.map((post: PostType) => (
          <Post key={post.id} post={post} ownPost={true} />
        ))}
      </div>
    </Layout>
  )
}

export default UserDetailsPage
