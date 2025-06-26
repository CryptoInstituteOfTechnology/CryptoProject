import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    const {session, signUpNewUser} = UserAuth()



    return (
        <div>
            <form className="signup-box">
                <h2>Sign Up</h2>
                <p>
                    Already have an account? <Link to='/login'>Sign in!</Link>
                </p>
                <div className="email-pass-box">
                    <input placeholder="Email Address" type="email" id="email-input" />
                    <input placeholder="Password" type="password" id="password-input" />
                    <button className="sign-up-button" disabled= {loading}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup