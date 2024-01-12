import { useContext, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Cookies from 'js-cookie'

export default function Register() {
  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const passwordConfirmInputRef = useRef()
  const [errors, setErrors] = useState([])
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const submitRegisterForm = async (e) => {
    e.preventDefault()

    const res = await fetch("https://eraasoft.integration25.com/api/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        password_confirmation: passwordConfirmInputRef.current.value
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
          <h1>Create new account</h1>
          {errors.map(error => (
            <p key={error}>{error}</p>
          ))}
          <input
            type='text'
            placeholder='Enter name here'
            ref={nameInputRef}
          />
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
          <input
            type='password'
            placeholder='Confirm password here'
            ref={passwordConfirmInputRef}
          />
          <button type='submit' onClick={(e) => submitRegisterForm(e)}>Register</button>
          <p>Already have account? <Link to="/login">Login now</Link></p>
        </form>
      </div>
    </main>
  )
}
