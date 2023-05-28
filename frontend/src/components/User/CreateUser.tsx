import { UserType } from './User'
import { useState } from 'react'
import axios from '../../config/axios'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const navigate = useNavigate()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await axios.post(
      '/user/',
      {
        name,
        email,
        password,
        role
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    )

    if (res.status === 201) {
      console.log('User updated successfully')
      navigate(`/user/${res.data.user.id}`)
    }

    console.log(res)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold py-2 text-center">Create User</h2>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 border-2 border-gray-400 p-5"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          value={role}
          onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="text-lg font-light bg-primary-500 text-white px-4 py-2 rounded-lg">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateUser
