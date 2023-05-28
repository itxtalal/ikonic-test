import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'
import checkAuthToken from '../hooks/checkAuth'
import Posts from '../components/Post/Posts'
import Users from '../components/User/Users'
import Layout from '../layout/Layout'
import { useLocation } from 'react-router-dom'
import Profile from '../components/Profile'

const Home = () => {
  const user = useAppSelector(userSelector)
  const { pathname } = useLocation()

  checkAuthToken()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  if (user.id === '') return <div>Loading...</div>

  return (
    <Layout>
      {pathname === '/posts' ? <Posts /> : null}

      {pathname === '/users' ? (
        <>
          <Users />
        </>
      ) : null}

      {pathname === '/profile' ? <Profile /> : null}
    </Layout>
  )
}

export default Home
