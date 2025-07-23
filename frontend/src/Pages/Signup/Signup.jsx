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
                navigate('/createprofile');
            } else {
                setError(result.error.message || 'Sign up failed');
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
                <CardContent>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-8">
                        <CardTitle className="text-4xl font-extrabold text-gray-900">Sign Up</CardTitle>
                        <CardAction className="text-base text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                                Sign in!
                            </Link>
                        </CardAction>
                        <div className="grid gap-8">
                            <Input
                                placeholder="Email Address"
                                type="email"
                                id="email-input"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 pl-12 text-lg text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />

                            <Input
                                placeholder="Password"
                                type="password"
                                id="password-input"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 pl-12 text-lg text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />

                            <Button
                                className="sign-up-button w-full py-4 px-6 bg-blue-500 text-xl font-semibold text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                                disabled={loading}
                            >
                                Sign Up
                            </Button>
                            {error && <p className="text-red-600 text-base">{error}</p>}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Signup