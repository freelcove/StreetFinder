"use client";
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import SignIn from '../auth/signin/page';


export default function ProfileCard() {
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
        <div className="bg-gray-200 shadow-lg rounded-lg p-5 flex flex-col items-center w-full h-full">
            {session ? (
                <>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white p-4 shadow-md rounded-md w-full">
                        <input
                            type="color"
                            className="mb-2"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder={name}
                            className="w-full mb-2 p-1 border border-gray-200 rounded"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="p-1 bg-blue-600 text-white rounded"
                        >
                            Update Profile
                        </button>
                    </form>

                    <button
                        className="text-sm font-bold duration-300 ease-in-out hover:scale-105"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <p>Please sign in to update your profile.</p>
                    <SignIn />
                </div>
            )}
        </div>
    );
};