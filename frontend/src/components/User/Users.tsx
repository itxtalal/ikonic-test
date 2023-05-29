import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { userSelector } from '../../redux/slices/userSlice'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import User, { UserType } from './User'
import useDebounce from '../../hooks/useDebounce'

const Users = () => {
  const user = useAppSelector(userSelector)
  const [users, setUsers] = React.useState([])
  const [filter, setFilter] = React.useState<'all' | 'admin' | 'user'>('all')
  const [filteredUsers, setFilteredUsers] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')
  const debouncedValue = useDebounce<string>(searchTerm, 500)

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
    } else {
      getOnlyUsers()
    }
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

  useEffect(() => {
    let filteredUsersCopy = users

    if (filter === 'admin') {
      filteredUsersCopy = filteredUsersCopy.filter(
        (user: any) => user.role === 'admin'
      )
    } else if (filter === 'user') {
      filteredUsersCopy = filteredUsersCopy.filter(
        (user: any) => user.role === 'user'
      )
    }

    if (debouncedValue) {
      filteredUsersCopy = filteredUsersCopy.filter((user: any) =>
        user.email.toLowerCase().includes(debouncedValue.toLowerCase())
      )
    }

    setFilteredUsers(filteredUsersCopy)
  }, [filter, debouncedValue, users])

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

      <div className="flex items-center gap-4 my-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className="flex-1"
        >
          <label
            htmlFor="default-search"
            className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Search Users by Email || Debounced Effect"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              className="text-white absolute right-2.5 bottom-2.5 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
        {user.role === 'admin' ? (
          <div className=" w-1/4 ml-auto">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 "
            >
              Filter Users
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-4"
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
      </div>

      <div className="flex flex-col gap-3">
        {filteredUsers?.map((user: UserType) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Users
