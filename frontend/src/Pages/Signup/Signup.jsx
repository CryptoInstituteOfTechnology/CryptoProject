import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input"
import { Card,CardTitle, CardContent, CardAction } from "../../Components/ui/card"
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
        <div>
            <Card>
                <CardContent>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-6">
                        <CardTitle>Sign Up</CardTitle>
                        <CardAction>
                            Already have an account? <Link to='/login'>Sign in!</Link>
                        </CardAction>
                        <div className="grid gap-6">
                            <Input
                                placeholder="Email Address"
                                type="email"
                                id="email-input"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                placeholder="Password"
                                type="password"
                                id="password-input"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button className="sign-up-button" disabled={loading}>Sign Up</Button>
                            {error && <p>{error}</p>}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Signup