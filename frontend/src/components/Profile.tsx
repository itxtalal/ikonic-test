import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'
import checkAuthToken from '../hooks/checkAuth'

import UserDetails from '../routes/UserDetails'
import Post, { PostType } from './Post/Post'
import axios from '../config/axios'

const Profile = () => {
  const user = useAppSelector(userSelector)
  const [userPosts, setUserPosts] = React.useState<PostType[]>([])

  checkAuthToken()

  const navigate = useNavigate()

  console.log(user)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const getUserPosts = async () => {
    const res = await axios.get('/post', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

    if (res.status === 200) {
      console.log(res.data)
      setUserPosts(() => res.data.posts)
    }
  }

  useEffect(() => {
    getUserPosts()
  }, [user])

  if (user.id === '') return <div>Loading...</div>

  return (
    <>
      <UserDetails id1={Number(user.id)} />

      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold">Posts by User</h2>
        {userPosts.map((post: PostType) => (
          <Post key={post.id} post={post} ownPost={true} />
        ))}
      </div>
    </>
  )
}

export default Profile
