import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Manager from './components/Manager.jsx'
import Login from './components/Login.jsx'
import './fonts.css';

import About from './components/About'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/manager",
      element: <><Navbar /><Manager /></>
    },
    {
      path: "/about",
      element: <><Navbar /><About /></>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
