"use client";

import { useState, useEffect, createContext  } from 'react';
import { useSession } from 'next-auth/react';
import Panorama from "@/app/practice/play/components/Panorama";
import Map from "@/app/practice/play/components/Map";
import { GameContext } from './context/GameContext';
import Link from 'next/link';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
export default function PracticePlayPage() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { data: session, status } = useSession();
    const [gameStatus, setGameStatus] = useState('playing');
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    const fetchAndSetCoordinates = async () => {
        if (session && session.accessToken) {
            try {
                const response = await fetch(`${backendUrl}/coordinates`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                const data = await response.json();
                setCoordinates({
                    lat: data.lat,
                    lng: data.lng
                });

            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        }
    }

    useEffect(() => {
        fetchAndSetCoordinates();
    }, [session, backendUrl]);

    // Handle Guess/Next game button click
    const handleButtonClick = () => {
        if (gameStatus === 'playing' && userCoordinates && coordinates) {
            const dist = calculateDistance(
                userCoordinates.lat,
                userCoordinates.lng,
                coordinates.lat,
                coordinates.lng
            );
            setDistance(dist);
            console.log(dist);
            setGameStatus('results');
        } else {
            fetchAndSetCoordinates();
            setUserCoordinates(null);
           setDistance(null);
            setGameStatus('playing');
        }
    };

    return (
        <GameContext.Provider value={{ gameStatus, setGameStatus, coordinates, userCoordinates, setUserCoordinates }}>            
            <div className="relative w-full h-full overflow-hidden">
                {coordinates && (
                    <>
                        <div className="w-full h-full z-0">
                            <Panorama />
                        </div>
                        <div className="absolute bottom-5 right-5 w-[20%] aspect-[4/3] bg-white opacity-40 hover:w-[30%] origin-bottom-right hover:opacity-100 transition-all duration-200 z-10">
                            <Map />
                            {distance && gameStatus === 'results' && (
                                <div 
                                    className={`absolute top-2 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 rounded 
                                                ${distance <= 0.5 ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                >
                                    {distance.toFixed(2)} km
                                </div>
                            )}
                            <button onClick={handleButtonClick} className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 bg-blue-500 text-white px-4 py-2 rounded">
                                {gameStatus === 'playing' ? 'Guess' : 'Next Game'}
                            </button>
                        </div>
                        <Link href="/">
                        <button className="absolute bottom-5 left-5 z-20 bg-blue-500 text-white px-4 py-2 rounded">
                            Home
                        </button>
                        </Link>
                    </>
                )}

            </div>
        </GameContext.Provider>

    )
}