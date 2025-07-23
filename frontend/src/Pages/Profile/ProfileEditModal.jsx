import React, { useState } from "react";
import { useBackendAttributes } from "../../context/BackEndContext";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-zinc-900 flex items-center justify-center z-50"
            onClick={onClose} // Close modal on background click
        >
            <div
                className="bg-white rounded-lg p-6 w-full max-w-sm relative" // smaller max width (max-w-sm instead of max-w-md)
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal box
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default function ProfileEditModal() {
    const { profile, userId, fetchProfile } = useBackendAttributes();
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        imageUrl: profile?.imageUrl || "",
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        phone: profile?.phone || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Submit PATCH request with changed fields only
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Prepare only changed fields
        const updatedFields = {};
        for (const key in form) {
            if (form[key] !== profile[key]) {
                updatedFields[key] = form[key];
            }
        }

        if (Object.keys(updatedFields).length === 0) {
            setError("No changes to update");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}/${profile.username}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedFields),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || "Failed to update profile");
                setLoading(false);
                return;
            }

            const data = await response.json();

            if (data.updated === true) {
                fetchProfile();  // Refresh profile data in context
                setIsOpen(false); // Close modal
            } else {
                setError(data.error || "Failed to update profiles");
            }
        } catch (err) {
            console.error("Fetch or parsing error:", err);
            setError("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mb-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg"
            >
                Edit Profile
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-lg">
                <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-lg font-semibold">Image URL</span>
                        <input
                            type="text"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            className="w-full p-3 border rounded text-lg"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-lg font-semibold">First Name</span>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="w-full p-3 border rounded text-lg"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-lg font-semibold">Last Name</span>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="w-full p-3 border rounded text-lg"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-lg font-semibold">Phone</span>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full p-3 border rounded text-lg"
                        />
                    </label>

                    {error && <p className="text-red-600 text-lg">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 text-lg"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </Modal>
        </>
    );
}