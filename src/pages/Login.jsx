import { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Cookies from 'js-cookie'

export default function Login() {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [errors, setErrors] = useState([])
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const submitLoginForm = async (e) => {
    e.preventDefault()

    const res = await fetch("https://eraasoft.integration25.com/api/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      })
    })
    const data = await res.json()

    if (data.status === 200) {
      setUser(data.data.user)
      Cookies.set("user", JSON.stringify(data.data.user), { expires: 1 })
      Cookies.set("token", data.data.token, { expires: 1 })

      navigate("/profile")

      return
    }

    setErrors(Object.values(data.errors).map(array => array[0]))
  }

  return (
    <main>
      <div className='form-container'>
        <form>
          <h1>Login to continue</h1>
          {errors.map(error => (
            <p key={error}>{error}</p>
          ))}
          <input
            type='email'
            placeholder='Enter email here'
            ref={emailInputRef}
          />
          <input
            type='password'
            placeholder='Enter password here'
            ref={passwordInputRef}
          />
          <button type='submit' onClick={(e) => submitLoginForm(e)}>Login</button>
          <p>Don't have account? <Link to="/register">Create one</Link></p>
        </form>
      </div>
    </main>
  )
}
