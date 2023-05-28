import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'

const Header = () => {
  const user = useAppSelector(userSelector)

  return (
    <div className="flex px-4 py-3 items-center my-4">
      <div className="flex items-center gap-8 mx-auto">
        <p className="text-lg font-light bg-cyan-600 text-white px-4 py-2 rounded-lg">
          User Role: {user.role}
        </p>
      </div>
    </div>
  )
}

export default Header
