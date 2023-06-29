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
import UserList from '../components/UserList';
import Link from 'next/link';
import { FiUsers, FiHome } from 'react-icons/fi'
import { FaExpand, FaTimes } from 'react-icons/fa'
import GameStatusDisplay from '../components/GameStatusDisplay';

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
    const [userScores, setUserScores] = useState<Record<string, number>>({});

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [showUserList, setShowUserList] = useState(false);
    const [confetti, setConfetti] = useState(false);

    const [showLargeMap, setShowLargeMap] = useState(false);

    // The config for the confetti
    const confettiConfig = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 100,
        dragFriction: 0.12,
        duration: 5010,
        stagger: 2,
        width: "20px",
        height: "20px",
        perspective: "800px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };


    // Message handling logic
    const handleMessages = useCallback((message: IMessage) => {
        try {
            const messageData = JSON.parse(message.body);
            if (messageData.gameState) setGameState(messageData.gameState);
            if (messageData.users) setUsers(messageData.users);
            if (messageData.coordinates) setCoordinates(messageData.coordinates);
            if (messageData.userScores) setUserScores(messageData.userScores);

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
            setConfetti(true);

            stompClient.current?.publish({
                destination: '/app/game.win',
                body: JSON.stringify({ id: id, name: name }),
            });
            setUserState(WIN);
            const timer = setTimeout(() => {
                setUserState(PLAYING);
                setConfetti(false);

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
            if (dist < 1) {
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

    useEffect(() => {
        setShowLargeMap(false);
    }, [gameState]);

    return (
        <MultiplayerGameContext.Provider value={{ stompClient, userScores, gameState, users, connected, coordinates, userCoordinates, setUserCoordinates, userState, setUserState }}>
            <div className="relative w-full h-full flex overflow-hidden z-0">

                <div className={`z-30 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center ${showUserList ? 'block' : 'hidden'}`}>
                    <UserList />
                    <button className="mt-4 bg-white text-black px-6 py-1 rounded-lg font-bold hover:bg-gray-300 transition-colors duration-200" onClick={() => setShowUserList(false)}>Close</button>
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none flex items-center justify-center">
                    <Confetti active={confetti} config={confettiConfig} />
                </div>

                {coordinates && (
                    <>
                        <div className="w-[70%] flex-grow">
                            <Panorama />
                        </div>
                        <div className="w-[30%] flex flex-col">
                            <div className="flex justify-between items-center p-2">
                                <button onClick={() => setShowUserList(true)}><FiUsers size='1.4rem' /></button>
                                <GameStatusDisplay />
                                <Link href="/">
                                    <FiHome size='1.4rem' />
                                </Link>
                            </div>
                            <div className={`flex w-full h-1/2 overflow-auto
                            border-x-[3px] border-t-[3px] ${userState === "WIN" ? "border-green-500" : ""}${userState === "WRONG" ? "border-red-500" : ""}`}>
                                <MultiplayerChat />
                            </div>
                            <div
                                className={`
        ${showLargeMap ? "absolute bottom-0 right-0 w-[100%] h-[100%] z-40" : "w-full h-1/2"}
        border-[3px]
        ${userState === "WIN" ? "border-green-500" : ""}
        ${userState === "WRONG" ? "border-red-500" : ""}
        ${gameState === 'DISPLAYING_RESULTS' && userState !== 'WIN' ? 'filter grayscale' : ''}
         duration-0`}>
                                <div className="relative w-full h-full">
                                    <Map />
                                    <button
                                        className={`z-20 opacity-70 absolute m-2 bg-white bg-opacity-50 text-black px-2 py-1 rounded-md hover:bg-gray-400 transition-colors duration-200 ${showLargeMap ? 'top-2 left-2 text-xl' : 'bottom-2 right-2 text-lg'}`}
                                        onClick={() => setShowLargeMap(prevState => !prevState)}
                                        onMouseEnter={() => setShowLargeMap(prevState => !prevState)}
                                    >
                                        {showLargeMap ? <FaTimes size='2rem' color='red' /> : <FaExpand size='2rem' />}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </MultiplayerGameContext.Provider>

    );
}
