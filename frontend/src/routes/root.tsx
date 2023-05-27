import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { User, updateUser, userSelector } from '../redux/slices/userSlice'
import checkAuthToken from '../hooks/checkAuth'

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

  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Header />

      <h1 className="text-xl">Home</h1>
    </div>
  )
}

export default Home
