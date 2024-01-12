import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import './App.css'
import { useState } from 'react'
import UserContext from './context/UserContext'
import Cookies from "js-cookie"

const getUserFromCookies = () => {
  if (Cookies.get("user")) {
    return JSON.parse(Cookies.get("user"))
  }

  return {}
}

function App() {
  const [user, setUser] = useState(getUserFromCookies())

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App
