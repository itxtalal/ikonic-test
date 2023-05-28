import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../layout/Header'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'
import checkAuthToken from '../hooks/checkAuth'
import CreatePost from '../components/Post/CreatePost'
import Layout from '../layout/Layout'

const NewPost = () => {
  const user = useAppSelector(userSelector)

  checkAuthToken()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Layout>
      <CreatePost />
    </Layout>
  )
}

export default NewPost
