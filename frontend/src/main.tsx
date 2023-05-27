import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import Login from './routes/Login'
import Register from './routes/Register'
import { StoreProvider } from './redux/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
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
