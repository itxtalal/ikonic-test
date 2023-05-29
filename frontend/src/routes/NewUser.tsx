import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import checkAuthToken from '../hooks/checkAuth'
import CreateUser from '../components/User/CreateUser'
import Layout from '../layout/Layout'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'

const NewUser = () => {
  checkAuthToken()
  const user = useAppSelector(userSelector)

  const navigate = useNavigate()

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/')
    }
  }, [])

  if (user.id === '') return <div>Loading...</div>

  return (
    <Layout>
      <CreateUser />
    </Layout>
  )
}

export default NewUser
