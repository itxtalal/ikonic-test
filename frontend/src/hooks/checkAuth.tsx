import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { updateUser, userSelector } from '../redux/slices/userSlice'
import axios from '../config/axios'
import { useNavigate } from 'react-router-dom'

const checkAuthToken = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)
  const navigate = useNavigate()

  const fetchUserData = async (token: string) => {
    try {
      const res = await axios.post(
        '/user/me',
        { token },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      if (res.status === 200) {
        const { user } = res.data
        dispatch(updateUser(user))
      }
    } catch (error) {
      localStorage.removeItem('token')
      navigate('/login')
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && user.id === '') {
      fetchUserData(token)
    }

    if (!token) {
      navigate('/login')
    }
  }, [])

  return null
}

export default checkAuthToken
