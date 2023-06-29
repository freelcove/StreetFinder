"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { useSession } from 'next-auth/react';
import { Client, IMessage } from '@stomp/stompjs';
import MultiplayerChat from '../components/MultiplayerChat';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';
import Panorama from '../components/Panorama';
import Map from '../components/Map';
import { calculateDistance } from '@/app/utils/calculateDistance';
import Confetti from 'react-dom-confetti';
import { useRouter } from 'next/navigation';

// Define constants
const PLAYING = 'PLAYING';
const WIN = 'WIN';
const WRONG = 'WRONG';
const WIN_TIMEOUT = 15000;
const WRONG_TIMEOUT = 5000;

export default function GameComponent() {
    const { data: session } = useSession();
    const [gameState, setGameState] = useState('');
    const [userState, setUserState] = useState('PLAYING');
    const name = session?.user?.name || '';
    const id = session?.user?.id || '';
    const [connected, setConnected] = useState<boolean>(false);

    const stompClient = useRef<Client | null>(null);
    const [users, setUsers] = useState([]);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number; } | null>(null);

    const [confetti, setConfetti] = useState(false);

    const router = useRouter();

    // The config for the confetti
    const confettiConfig = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: "100",
        dragFriction: 0.12,
        duration: "5010",
        stagger: "2",
        width: "20px",
        height: "20px",
        perspective: "800px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    // When the win state is activated
    useEffect(() => {
        if (userState === WIN) {
            setConfetti(true);
            const timer = setTimeout(() => setConfetti(false), WIN_TIMEOUT);
            return () => clearTimeout(timer);
        }
    }, [userState]);


    // Message handling logic
    const handleMessages = useCallback((message: IMessage) => {
        try {
            const messageData = JSON.parse(message.body);
            if (messageData.gameState) setGameState(messageData.gameState);
            if (messageData.users) setUsers(messageData.users);
            if (messageData.coordinates) setCoordinates(messageData.coordinates);
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    }, []);


    useEffect(() => {
        const token = (session as any)?.accessToken;

        if (!token) {
            console.error("No token available");
            return;
        }

        stompClient.current = new Client({
            // debug: (str) => {
            //     console.log(str);
            // },
            webSocketFactory: () => new SockJS(`${backendUrl}/ws`),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                setConnected(true);
                console.log("Connected to thet websocket!");
                stompClient.current?.subscribe('/topic/game', handleMessages);
                stompClient.current?.subscribe(`/user/${id}/state`, handleMessages);


                stompClient.current?.publish({
                    destination: '/app/game.start',
                    body: JSON.stringify({ id: id, name: name }),

                });
            },
            onStompError: (frame) => {
                console.error('Could not connect to WebSocket server. Please refresh this page to try again!');
                console.error(frame);
            },
        });

        stompClient.current.activate();

        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
                setConnected(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleWin = () => {
            stompClient.current?.publish({
                destination: '/app/game.win',
                body: JSON.stringify({ name: name }),
            });
            setUserState(WIN);
            const timer = setTimeout(() => {
                setUserState(PLAYING);
            }, WIN_TIMEOUT);
            return () => clearTimeout(timer);
        };

        if (userCoordinates && coordinates) {
            const dist = calculateDistance(
                userCoordinates.lat,
                userCoordinates.lng,
                coordinates.lat,
                coordinates.lng
            );
            if (dist < 100) {
                handleWin();
            } else {
                setUserState(WRONG);
                const timer = setTimeout(() => {
                    setUserState(PLAYING);
                }, WRONG_TIMEOUT);
                return () => clearTimeout(timer);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCoordinates])


    return (
        <MultiplayerGameContext.Provider value={{ stompClient, gameState, users, connected, coordinates, userCoordinates, setUserCoordinates, userState, setUserState }}>
            <div className="relative w-full h-full flex overflow-hidden z-0">
                <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none flex items-center justify-center">
                    <Confetti active={confetti} config={confettiConfig} />
                </div>

                {coordinates && (
                    <>
                        <div className="w-[70%] flex-grow">
                            <Panorama />
                        </div>
                        <div className="w-[30%] flex flex-col">
                            <div className={`w-full h-1/2 flex-grow overflow-auto
                            border-[3px] ${userState === "WIN" ? "border-green-500" : ""}${userState === "WRONG" ? "border-red-500" : ""}`}>
                                <MultiplayerChat />
                            </div>
                            <div className={`w-full h-1/2 border-x-[3px] border-b-[3px] ${userState === "WIN" ? "border-green-500" : ""}${userState === "WRONG" ? "border-red-500" : ""} ${gameState === 'DISPLAYING_RESULTS' && userState !== 'WIN' ? 'filter grayscale' : ''}`}>
                                <Map />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MultiplayerGameContext.Provider>

    );
}
