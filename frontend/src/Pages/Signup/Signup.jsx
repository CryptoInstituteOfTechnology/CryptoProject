import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input"
import { Card, CardTitle, CardContent, CardAction } from "../../Components/ui/card"
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
                console.log(session)
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
        <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8">
            <Card className="bg-white rounded-lg shadow-md">
                <CardContent>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-6">
                        <CardTitle className="text-3xl font-bold text-gray-900">Sign Up</CardTitle>
                        <CardAction className="text-sm text-gray-600">
                            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign in!</Link>
                        </CardAction>
                        <div className="grid gap-6">
                            <Input
                                placeholder="Email Address"
                                type="email"
                                id="email-input"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />

                            <Input
                                placeholder="Password"
                                type="password"
                                id="password-input"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />

                            <Button
                                className="sign-up-button w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                                disabled={loading}
                            >
                                Sign Up
                            </Button>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Signup