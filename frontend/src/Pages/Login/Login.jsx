import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    const { session, logInUser } = UserAuth()
    const navigate = useNavigate()
    //copied form signup page same logic, chnage var names

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await logInUser(email, password);

            if (result.success) {
                console.log(session)
                navigate('/dashboard');
            } else {
                setError(result.error.message || 'Log in up failed');
            }
        } catch (error) {
            console.log('issue moving to dashboard', error);
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <form onSubmit={handleLogin} className="login-box">
                <h2>Login</h2>
                <p>
                    No Account? Create one! <Link to='/'>Sign Up!</Link>
                </p>
                <div className="email-pass-box">
                    <input
                        placeholder="Email Address"
                        type="email"
                        id="email-input"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        id="password-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="login-button" disabled={loading}>Login</button>
                    {error && <p>{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default Login