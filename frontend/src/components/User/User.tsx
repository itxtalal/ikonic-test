import React from 'react'
import { Link } from 'react-router-dom'

export interface UserType {
  id: string
  name?: string
  email: string
  role: string
}

const User = ({ user }: { user: UserType }) => {
  return (
    <Link
      to={`/user/${user.id}`}
      className={`flex flex-col gap-4 border-2 border-gray-200 rounded-md p-2 my-2`}
    >
      <h1 className="text-xl font-bold">Name: {user.name}</h1>
      <p className="text-md">Email: {user?.email}</p>

      <p className="text-sm font-semibold">
        Role: {user.role ? user.role : 'N/A'}
      </p>
    </Link>
  )
}

export default User
