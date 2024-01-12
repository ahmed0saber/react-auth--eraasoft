import { useContext } from 'react'
import UserContext from "../context/UserContext"
import { Navigate } from 'react-router-dom'

export default function Protected({ children }) {
    const { user } = useContext(UserContext)

    if (Object.keys(user).length === 0) {
        return <Navigate to="/login" replace />
    }

    return children
}
