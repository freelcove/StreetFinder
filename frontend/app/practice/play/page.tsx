"use client";

import { useState } from 'react';
import Panorama from "@/app/practice/play/components/Panorama";
import Map from "@/app/practice/play/components/Map";

export default function PracticePlayPage() {
    // Define state for the current game status
    const [gameStatus, setGameStatus] = useState('playing'); // initial state set to 'playing'

    // Define state for correct position
    const [correctPosition] = useState({ lat: 35.8301930000, lng: 128.6183200000 });

    // Handle Guess/Next game button click
    const handleButtonClick = () => {
        if (gameStatus === 'playing') {
            setGameStatus('results');
        } else {
            // Logic to start next game can go here
            setGameStatus('playing');
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden">

            {/* Full screen for Panorama */}
            <div className="w-full h-full z-0">
                <Panorama />
            </div>

            {/* Map at the bottom right */}
            <div className="absolute bottom-5 right-5 w-[20%] aspect-[4/3] bg-white opacity-40 hover:w-[30%] origin-bottom-right hover:opacity-100 transition-all duration-200 z-10">
                <Map />
                <button onClick={handleButtonClick} className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 bg-blue-500 text-white px-4 py-2 rounded">
                    {gameStatus === 'playing' ? 'Guess' : 'Next Game'}
                </button>
            </div>

            {/* Guess/Next Game Button */}


        </div>
    )
}