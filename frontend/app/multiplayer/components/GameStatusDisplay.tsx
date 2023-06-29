"use client";

import { useContext, useEffect, useState } from 'react';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';

export default function GameStatusDisplay() {
    const { gameState, userState } = useContext(MultiplayerGameContext);
    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'DISPLAYING_RESULTS') {
            setCountdown(15);
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown !== null ? prevCountdown - 1 : null);
            }, 1000);
        } else if (userState === 'WRONG' && gameState !== 'DISPLAYING_RESULTS') {
            setCountdown(5);
            timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown !== null ? prevCountdown - 1 : null);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [gameState, userState]);

    const getStatusMessage = () => {
        if (gameState === 'DISPLAYING_RESULTS' && userState === 'WIN') {
            return { message: `Next: ${countdown}`, color: "#22c55e" };
        } else if (gameState === 'DISPLAYING_RESULTS') {
            return { message: `Next: ${countdown}`, color: "#808080" };
        } else if (userState === 'WRONG' && gameState !== 'DISPLAYING_RESULTS') {
            return { message: `${countdown}`, color: "#EF4444" };
        }  else {
            return { message: 'STREET FINDER', color: "black" };
        }
    };

    const { message, color } = getStatusMessage();

    return (
        <div className="w-full h-full font-bold flex justify-center items-center" style={{ color: color }}>
            {message}
        </div>
    );
}
