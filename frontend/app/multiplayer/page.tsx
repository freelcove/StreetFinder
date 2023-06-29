"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MultiplayerPage() {
    const { data: session, update } = useSession();
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isChanged, setIsChanged] = useState(false);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const router = useRouter();

    // Initialize user data when session data changes
    useEffect(() => {

        if (session) {
            setName(session.user.name);
            setColor(session.user.color ? session.user.color : "#000000");
        }
    }, [session]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isChanged) {
            // Redirect to /multiplayer/play
            router.push('/multiplayer/play');
        } else {


            // Ensure color is a valid HEX color
            if (!/^#[0-9A-F]{6}$/i.test(color)) {
                setModalMessage("Invalid color. Please enter a valid HEX color.");
                setIsModalOpen(true);
                return;
            }

            // Validate name length and character type
            if (name.length < 4 || name.length > 20 || !/^[a-z0-9\uAC00-\uD7A3\u1100-\u11FF]+$/i.test(name)) {
                setModalMessage("Invalid name. Must be 4-20 characters long, and contain only numbers, letters, and Korean characters.");
                setIsModalOpen(true);
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

            // If response is OK, update session data and set updateSuccess to true
            if (response.ok) {
                setUpdateSuccess(true);
                const data = await response.json();
                await update(data);
                setModalMessage("Update Successful");
                setIsModalOpen(true);

            } else {
                setModalMessage("Failed to update profile. Please try again.");
                setIsModalOpen(true);

            }
            setIsChanged(false);
        }
    };

    // Input field change handlers
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setIsChanged(true);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
        setIsChanged(true);
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col items-center p-5 bg-white rounded-lg">

                <div className="mt-4 p-4 text-center  rounded-lg w-full">
                    <p className="font-bold mb-2 text-lg">How to play</p>
                    <p className="mb-1">1. 거리뷰를 보고 위치를 추측</p>
                    <p className="mb-1">2. 지도에서 예상 위치를 클릭</p>
                    <p className="mb-1">3. 가장 먼저 맞추는 사람이 점수 획득</p>
                </div>

                <div className="relative shadow-md rounded-lg p-2 w-1/2">
                    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center ${isModalOpen ? 'block' : 'hidden'}`}>
                        <div className="bg-white rounded-lg p-5 w-1/5 flex flex-col items-center">
                            <p>{modalMessage}</p>
                            <button className="mt-4 bg-white text-black px-6 py-1 rounded-full font-bold hover:bg-gray-300 transition-colors duration-200" onClick={() => window.location.reload()}>Close</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white p-4 rounded-md w-full">
                        <div className="flex items-center mb-2 w-full">
                            <input
                                type="color"
                                className="mr-2"
                                value={color}
                                onChange={handleColorChange}
                            />
                            <input
                                type="text"
                                placeholder={name}
                                className="w-full p-1 border border-gray-200 rounded"
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="mt-4 bg-gray-950 text-white text-sm px-3 py-1 rounded-md font-bold hover:bg-gray-700 transition-colors duration-200"
                                disabled={updateSuccess}
                            >
                                {isChanged ? "Update" : "Play"}
                            </button>
                        </div>
                    </form>
                </div>



            </div>
        </div>
    );
}
