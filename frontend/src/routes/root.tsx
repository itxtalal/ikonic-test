import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'
import checkAuthToken from '../hooks/checkAuth'
import Posts from '../components/Post/Posts'

const Home = () => {
  const user = useAppSelector(userSelector)

  checkAuthToken()

  const navigate = useNavigate()

  console.log(user)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  if (user.id === '') return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-12 min-h-screen h-full w-screen mx-6">
      <Header />
      <Posts />
    </div>
  )
}

export default Home
