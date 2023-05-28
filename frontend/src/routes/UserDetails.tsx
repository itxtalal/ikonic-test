import React, { useEffect } from 'react'
import { removeUser, userSelector } from '../redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import axios from '../config/axios'
import { useNavigate, useParams } from 'react-router-dom'
import checkAuthToken from '../hooks/checkAuth'
import User, { UserType } from '../components/User/User'
import EditUser from '../components/User/EditUser'

const UserDetails = ({ id1 }: { id1?: number }) => {
  const user = useAppSelector(userSelector)
  const [userA, setUserA] = React.useState<UserType | null>(null)
  const { id } = useParams()
  const [isEditing, setIsEditing] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const useDispatch = useAppDispatch()

  const id2 = id1 ? id1 : id

  checkAuthToken()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const getUser = async () => {
    const res = await axios.get('/user/' + id2, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

    if (res.status === 200) {
      console.log(res.data)
      setUserA(() => res.data)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const deleteHandler = async () => {
    try {
      const res = await axios.delete('/user/' + id2, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      if (res.status === 200) {
        console.log('User deleted successfully')

        if (Number(user.id) === Number(userA?.id)) {
          localStorage.removeItem('token')
          useDispatch(removeUser())
          navigate('/login')
        }

        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold">User</h1>

      {user.role === 'admin' || Number(user.id) === Number(userA?.id) ? (
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="bg-primary-300 text-white px-4 py-1 rounded-md"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button
            onClick={() => setIsDeleting((prev) => !prev)}
            className="bg-red-500 text-white px-4 py-1 rounded-md"
          >
            {isDeleting ? 'Cancel' : 'Delete'}
          </button>
        </div>
      ) : null}

      {userA ? (
        <>
          {isDeleting ? (
            <div className="flex flex-col gap-2 border-2 border-gray-400 p-5 my-4">
              <h2 className="text-3xl font-semibold py-2 text-center">
                Are you sure you want to delete this user?
              </h2>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsDeleting(false)}
                  className="bg-primary-300 text-white px-5 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteHandler}
                  className="bg-red-500 text-white px-5 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : null}

          {isEditing ? (
            <EditUser
              user={userA}
              setUser={setUserA}
              setIsEditing={setIsEditing}
            />
          ) : (
            <User user={userA} />
          )}
        </>
      ) : null}
    </div>
  )
}

export default UserDetails
