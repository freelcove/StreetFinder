"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { useSession } from 'next-auth/react';
import { Client, IMessage } from '@stomp/stompjs';
import MultiplayerChat from '../components/MultiplayerChat';
import UserList from '../components/UserList';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';
import Panorama from '../components/Panorama';
import Map from '../components/Map';
import { calculateDistance } from '@/app/utils/calculateDistance';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GameComponent() {
    const { data: session } = useSession();
    const [gameState, setGameState] = useState('');
    const [userState, setUserState] = useState('PLAYING');
    const [photodate, setPhotodate] = useState('');
    const username = session?.user?.name || '';
    const userId = session?.user?.id || '';
    const [connected, setConnected] = useState<boolean>(false);

    const stompClient = useRef<Client | null>(null);
    const [users, setUsers] = useState([]);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    useEffect(() => {
        const token = (session as any)?.accessToken;

        if (!token) {
            console.error("No token available");
            return;
        }

        stompClient.current = new Client({
            debug: (str) => {
                console.log(str);
            },
            webSocketFactory: () => new SockJS(`${backendUrl}/ws`),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                setConnected(true);
                console.log("Connected to thet websocket!");
                stompClient.current?.subscribe('/topic/game', (message) => {
                    console.log('Received:', message.body);
                    try {
                        const messageData = JSON.parse(message.body);
                        setGameState(messageData.gameState);
                        setUsers(messageData.users);
                        setCoordinates(messageData.coordinates);
                    } catch (error) {
                        console.error("Error parsing message:", error);
                    }
                });
                stompClient.current?.subscribe(`/user/${userId}/state`, (message) => {
                    console.log('This:', message.body);
                    try {


                    } catch (error) {
                        console.error("Error parsing message:", error);
                    }
                });


                stompClient.current?.publish({
                    destination: '/app/game.start',
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
    }, []);

    useEffect(() => {
        if (userCoordinates) {
            const dist = calculateDistance(
                userCoordinates.lat,
                userCoordinates.lng,
                coordinates.lat,
                coordinates.lng
            );
            if (dist < 20) {
                handleWin();
            }
            else {
                setUserState("HOLD");
                setTimeout(() => {
                    setUserState("PLAYING");
                }, 5000);
            }
        }
    }, [userCoordinates])

    useEffect(() => {
        console.log(userState);
    }, [userState])
    const handleWin = () => {
        stompClient.current?.publish({
            destination: '/app/game.win',
            body: JSON.stringify({ sender: username }),
        });

    };

    return (
        <MultiplayerGameContext.Provider value={{ stompClient, gameState, users, connected, coordinates, userCoordinates, setUserCoordinates, userState, setUserState, photodate, setPhotodate }}>
            <div className="relative w-full h-full overflow-hidden z-0">
                {coordinates && (
                    <>
                       
                        <div className="absolute top-5 right-5 w-[20%] aspect-[4/3] z-10">
                            <MultiplayerChat />

                        </div>
                        <div className="absolute bottom-5 right-5 w-[20%] aspect-[4/3] bg-white opacity-80 hover:w-[30%] origin-bottom-right hover:opacity-100 transition-all duration-200 z-10">
                            <Map />
                        </div>
                        {/* <div className="absolute top-5 left-5 w-[10%] aspect-[4/3] z-10">
                            <UserList />

                        </div> */}
                         <Panorama />
                    </>
                )}
            </div>
        </MultiplayerGameContext.Provider>
    );
}
