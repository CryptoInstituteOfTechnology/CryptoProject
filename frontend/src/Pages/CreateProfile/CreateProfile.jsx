import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Card, CardTitle, CardContent, CardAction } from "../../Components/ui/card";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CreateProfile() {
    const session = UserAuth();
    const userId = session.session?.user?.id; // hidden from user

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        imageUrl: "",
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "imageUrl") {
            setImagePreview(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!userId) {
            setError("User not authenticated");
            return;
        }
        if (!form.username) {
            setError("Username is required");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/profile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, ...form }),
            });
            const data = await response.json();
            if (data.added) {
                navigate("/dashboard");
            } else {
                setError(data.error || "Failed to create profile");
            }
        } catch (err) {
            setError("Failed to create profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8">
            <Card className="bg-white rounded-lg shadow-md">
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <CardTitle className="text-3xl font-bold text-gray-900">Create Profile</CardTitle>
                        <CardAction className="text-sm text-gray-600">
                            Already have a profile? <Link to="/profile" className="text-blue-500 hover:text-blue-700">View Profile</Link>
                        </CardAction>

                        <Input
                            placeholder="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded-lg"
                            required
                        />

                        <Input
                            placeholder="Image URL"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded-lg"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Profile Preview"
                                className="w-32 h-32 object-cover rounded-full mx-auto"
                            />
                        )}

                        <Input
                            placeholder="First Name"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded-lg"
                        />

                        <Input
                            placeholder="Last Name"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded-lg"
                        />

                        <Input
                            placeholder="Phone Number"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded-lg"
                        />

                        <Button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Profile"}
                        </Button>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}