"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Panorama from "@/app/singleplayer/components/Panorama";
import Map from "@/app/singleplayer/components/Map";
import { GameContext } from '../context/GameContext';
import Link from 'next/link';
import { calculateDistance } from '@/app/utils/calculateDistance';
import Sample from "../../../public/json/test-sample.json";
import { randInt } from 'three/src/math/MathUtils';


export default function SingleplayerPlayPage() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { data: session, status } = useSession();
    const [gameStatus, setGameStatus] = useState('playing');
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);


    const setSampleCoordinates = useCallback(async () => {
                let id = Math.floor(Math.random()*5);
                const data = await Sample.data[id];
                console.log(data.lat);
                console.log(data.lng);
                console.log(data.place_name);

                await setCoordinates({
                    lat: data.lng,
                    lng: data.lat
                });
    }, [])

    useEffect(() => {
        setSampleCoordinates();
    }, []);

    // Handle Guess/Next game button click
    const handleButtonClick = () => {
        if (gameStatus === 'playing' && userCoordinates) {
            const dist = calculateDistance(
                userCoordinates.lat,
                userCoordinates.lng,
                coordinates.lat,
                coordinates.lng
            );
            console.log(userCoordinates.lat);
            console.log(userCoordinates.lng);
            
            setDistance(dist);
            setGameStatus('results');

        } else {
            setSampleCoordinates();
            setUserCoordinates(null);
            setDistance(null);
            setGameStatus('playing');
        }
    };

    useEffect(() => {
        console.log(gameStatus);
    }, [gameStatus]);

    return (
        <GameContext.Provider value={{ gameStatus, setGameStatus, coordinates, userCoordinates, setUserCoordinates }}>
            <div className="relative w-full h-full overflow-hidden z-0">
                {coordinates && (
                    <>
                        <div className="w-full h-full z-0">
                            <Panorama />
                        </div>
                        <div className="absolute bottom-5 right-5 w-[20%] aspect-[4/3] bg-white opacity-40 hover:w-[30%] origin-bottom-right hover:opacity-100 transition-all duration-200 z-10">
                            <Map />
                            {distance && gameStatus === 'results' && (
                                <div
                                    className={`absolute top-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded 
                                                ${distance <= 0.5 ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                >
                                    {distance.toFixed(2)} km
                                </div>
                            )}
                            <button onClick={handleButtonClick} disabled={!userCoordinates} className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 bg-blue-500 text-white px-4 py-2 rounded ${!userCoordinates ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {gameStatus === 'playing' ? 'Guess' : 'Next Game'}
                            </button>
                        </div>
                        <Link href="/">
                            <button className="absolute bottom-5 left-5 bg-blue-500 text-white px-4 py-2 rounded z-10">
                                Home
                            </button>
                        </Link>
                    </>
                )}

            </div>
        </GameContext.Provider>

    )
}