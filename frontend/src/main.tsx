import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import Login from './routes/Login'
import Register from './routes/Register'
import { StoreProvider } from './redux/store'
import PostDetails from './routes/PostDetails'
import NewPost from './routes/NewPost'
import NewUser from './routes/NewUser'
import UserDetailsPage from './routes/UserDetailsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/posts',
    element: <Root />
  },
  {
    path: '/users',
    element: <Root />
  },
  {
    path: '/profile',
    element: <Root />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/post/:id',
    element: <PostDetails />
  },
  {
    path: '/newPost',
    element: <NewPost />
  },
  {
    path: '/user/:id',
    element: <UserDetailsPage />
  },
  {
    path: '/newUser',
    element: <NewUser />
  }
])

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
)
