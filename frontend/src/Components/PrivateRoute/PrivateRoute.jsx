import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    //navigates users to singup if they arent in a session(not logged in) they cant access protected routes
    const { session } = UserAuth()
    const handleLogin = async () => {
        // login logic here...
        if (session) {
            navigate("/dashboard");
        }
    };
    return (
        <>{session ? <>{children}</> : <Navigate to="/signup" />} </>
    )
}


export default PrivateRoute