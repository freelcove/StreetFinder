"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Profile = () => {
    const { data: session } = useSession();
    const [name, setUsername] = useState("");
    const [color, setColor] = useState("#FFFFFF");
    const [message, setMessage] = useState("");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (session) {
            setUsername(session.user.name);
            setColor(session.user.color ? session.user.color : "#FFFFFF");

        }
    }, [session]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Ensure color is a valid HEX color
        if (!/^#[0-9A-F]{6}$/i.test(color)) {
            setMessage("Invalid color. Please enter a valid HEX color.");
            return;
        }

        const updatedUser = {
            name: name,
            color: color,
        };
        console.log(updatedUser);

        const response = await fetch(`${backendUrl}/api/user/${session!.user.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setMessage("Profile updated successfully.");
        } else {
            setMessage("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Welcome, {name}!</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white p-4 shadow-md rounded-md">
                <input
                    type="text"
                    placeholder="Username"
                    className="mb-2 p-1 border border-gray-200 rounded"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="color"
                    className="mb-2"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <button
                    type="submit"
                    className="p-1 bg-blue-600 text-white rounded"
                >
                    Update Profile
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
