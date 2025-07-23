import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Card, CardTitle, CardContent, CardAction } from "../../Components/ui/card"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")
    const { session, logInUser } = UserAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await logInUser(email, password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error.message || 'Log in up failed');
            }
        } catch (error) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-md mx-auto p-6 md:p-8 lg:p-10">
            <Card className="bg-white rounded-lg shadow-md">
                <CardTitle>
                    <CardContent>
                        <form onSubmit={handleLogin} className="flex flex-col gap-8 login-box">
                            <h2 className="text-4xl font-extrabold text-gray-900">Login</h2>
                            <p className="text-base text-gray-600">
                                No Account? Create one!{" "}
                                <Link to="/" className="text-blue-500 hover:text-blue-700 font-semibold">
                                    Sign Up!
                                </Link>
                            </p>
                            <div className="grid gap-8 email-pass-box">
                                <input
                                    placeholder="Email Address"
                                    type="email"
                                    id="email-input"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 pl-12 text-lg text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />

                                <input
                                    placeholder="Password"
                                    type="password"
                                    id="password-input"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-4 pl-12 text-lg text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />

                                <button
                                    className="login-button w-full py-4 px-6 bg-blue-500 text-xl font-semibold text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                                    disabled={loading}
                                >
                                    Login
                                </button>
                                {error && <p className="text-red-600 text-base">{error}</p>}
                            </div>
                        </form>
                    </CardContent>
                </CardTitle>
            </Card>
        </div>
    );
}

export default Login