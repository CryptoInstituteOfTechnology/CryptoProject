import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const {session, signOut} = UserAuth()
    const navigate = useNavigate();


    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome  </h2>
        </div>
    )
}

export default Dashboard