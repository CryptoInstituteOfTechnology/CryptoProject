import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AllTickersView from "../../Components/AllTickersView/AllTickersView"
import NewsView from "../../Components/NewsView/NewsView"

const Dashboard = () => {

    const { session, signOut } = UserAuth()
    const navigate = useNavigate();
    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOut()
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

    console.log(session)

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome, {session?.user?.email} </h2>
            <div>
                <p
                    onClick={handleSignOut}
                    className="sign-out">Sign Out
                </p>
            </div>
        </div>
    )
}

export default Dashboard