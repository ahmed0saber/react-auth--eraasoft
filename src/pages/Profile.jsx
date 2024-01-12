import { useContext, useEffect, useState } from 'react'
import UserContext from "../context/UserContext"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const handleLogout = async () => {
        try {
            const res = await fetch("https://eraasoft.integration25.com/api/logout", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            const data = await res.json()

            if (data.status === 200 || data.status === 401) {
                setUser({})
                Cookies.remove("user")
                Cookies.remove("token")

                navigate("/login")

                return
            }

            console.log(data.message)
        } catch (err) {
            console.log(err)
        }
    }

    const getProducts = async () => {
        try {
            const res = await fetch("https://eraasoft.integration25.com/api/products", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            const data = await res.json()

            if (data.status === 200) {
                setProducts(data.data.products)
                return
            }

            if (data.status === 401) {
                setUser({})
                Cookies.remove("user")
                Cookies.remove("token")

                // toast with timeout [OR] sweetalert with confirm button
                console.log("ERROR")
                setTimeout(() => {
                    navigate("/login")
                }, 2000)

                return
            }

            console.log("ERROR")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <main>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <span>{product.price}</span>
                    </div>
                ))}
            </div>
        </main>
    )
}
