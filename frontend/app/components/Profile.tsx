"use client";
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';


const Profile = () => {
    const { data: session, update } = useSession(); 
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");
    const [message, setMessage] = useState("");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // If session data is present, initialize name and color
    useEffect(() => {
        if (session) {
            setName(session.user.name);
            setColor(session.user.color ? session.user.color : "#000000");
            console.log(session!.user);
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

        const response = await fetch(`${backendUrl}/api/user/${session!.user.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser),
        });

        // If response is OK, update session data
        if (response.ok) {
            const data = await response.json();
            update(data);
            getSession();
            setMessage("Profile updated successfully.");
        } else {
            setMessage("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white p-4 shadow-md rounded-md">
                <input
                    type="text"
                    placeholder={name}
                    className="mb-2 p-1 border border-gray-200 rounded"
                    onChange={(e) => setName(e.target.value)}
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

            <button
                className="text-2xl font-bold duration-300 ease-in-out hover:scale-105"
                onClick={() => signOut()}
            >
                Sign Out
            </button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;