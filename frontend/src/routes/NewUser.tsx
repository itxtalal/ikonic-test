import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../layout/Header'
import checkAuthToken from '../hooks/checkAuth'
import CreateUser from '../components/User/CreateUser'

const NewUser = () => {
  checkAuthToken()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="flex flex-col gap-12 min-h-screen  h-full w-screen mx-6">
      <Header />

      <CreateUser />
    </div>
  )
}

export default NewUser
