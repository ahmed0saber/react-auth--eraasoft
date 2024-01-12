import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../context/UserContext'

export default function Navbar() {
    const { user } = useContext(UserContext)
    return (
        <nav className='navbar'>
            <NavLink to="/">Home</NavLink>
            {user.name ? (
                <NavLink to="/profile">{user.name}</NavLink>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </nav>
    )
}
