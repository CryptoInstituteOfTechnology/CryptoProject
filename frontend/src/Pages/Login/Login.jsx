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
        <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8">
            <Card className="bg-white rounded-lg shadow-md">
                <CardTitle>
                    <CardContent>
                        <form onSubmit={handleLogin} className="flex flex-col gap-6 login-box">
                            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                            <p className="text-sm text-gray-600">
                                No Account? Create one! <Link to="/" className="text-blue-500 hover:text-blue-700">Sign Up!</Link>
                            </p>
                            <div className="grid gap-6 email-pass-box">
                                <input
                                    placeholder="Email Address"
                                    type="email"
                                    id="email-input"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />

                                <input
                                    placeholder="Password"
                                    type="password"
                                    id="password-input"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />

                                <button
                                    className="login-button w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                                    disabled={loading}
                                >
                                    Login
                                </button>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        </form>
                    </CardContent>
                </CardTitle>
            </Card>
        </div>
    );
}

export default Login