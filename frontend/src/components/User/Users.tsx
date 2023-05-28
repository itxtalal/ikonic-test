import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { userSelector } from '../../redux/slices/userSlice'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import User, { UserType } from './User'

const Users = () => {
  const user = useAppSelector(userSelector)
  const [users, setUsers] = React.useState([])
  const [filter, setFilter] = React.useState<'all' | 'admin' | 'user'>('all')
  const [filteredUsers, setFilteredUsers] = React.useState([])

  const getUsers = async () => {
    const res = await axios.get('/user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    if (res.status === 200) {
      setUsers(() => res.data)
      setFilteredUsers(() => res.data)
    }
  }
  const getOnlyUsers = async () => {
    const res = await axios.get('/user/user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    if (res.status === 200) {
      setUsers(() => res.data)
      setFilteredUsers(() => res.data)
    }
  }

  useEffect(() => {
    if (user.role === 'admin') {
      getUsers()
    }
    getOnlyUsers()
  }, [])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredUsers(() => users)
    } else if (filter === 'admin') {
      const adminUsers = users.filter((user: any) => user.role === 'admin')
      setFilteredUsers(() => adminUsers)
    } else if (filter === 'user') {
      const userUsers = users.filter((user: any) => user.role === 'user')
      setFilteredUsers(() => userUsers)
    }
  }, [filter])

  return (
    <div className="">
      <Link
        to="/newUser"
        className="bg-primary-500 text-white py-4 px-2 rounded-lg hover:bg-primary-600 flex items-center justify-center text-center w-full lg:w-1/4 mx-auto"
      >
        Create a New User
      </Link>
      <div className="flex">
        <h1 className="text-4xl font-bold">Users</h1>
        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
          {filteredUsers?.length}
        </span>
      </div>
      {user.role === 'admin' ? (
        <div className="my-4 w-1/4 ml-auto">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 "
          >
            Filter Users
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'all' | 'admin' | 'user')
            }
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {filteredUsers?.map((user: UserType) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Users
