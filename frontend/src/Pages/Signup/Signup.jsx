import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    const { session, signUpNewUser } = UserAuth()
    const navigate = useNavigate()
    //send signup to supabase, navigate user to dashboard(home page)

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signUpNewUser(email, password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error.message || 'Sign up failed');
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
            <form onSubmit={handleSignUp} className="signup-box">
                <h2>Sign Up</h2>
                <p>
                    Already have an account? <Link to='/login'>Sign in!</Link>
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

                    <button className="sign-up-button" disabled={loading}>Sign Up</button>
                    {error && <p>{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default Signup