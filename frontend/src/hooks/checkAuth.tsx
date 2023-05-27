import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { updateUser, userSelector } from '../redux/slices/userSlice'
import axios from '../config/axios'

const checkAuthToken = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)

  const fetchUserData = async (token: string) => {
    try {
      const res = await axios.post('/user/me', { token })

      if (res.status === 200) {
        const { user } = res.data
        dispatch(updateUser(user))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && user.id === '') {
      fetchUserData(token)
    }
  }, [dispatch])

  return null
}

export default checkAuthToken
