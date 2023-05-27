import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { removeUser, userSelector } from '../redux/slices/userSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(removeUser())
    navigate('/login')
  }

  return (
    <div className="flex px-4 py-3 items-center my-4">
      <Link
        to="/"
        className="flex items-center text-3xl font-bold text-primary-600 "
      >
        Ikonic Test
      </Link>

      <div className="flex items-center gap-8 ml-auto">
        <p className="text-lg font-light bg-primary-500 text-white px-4 py-2 rounded-lg">
          Role: {user.role}
        </p>
        <button
          onClick={logoutHandler}
          className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-5 py-2.5 text-center"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Header
