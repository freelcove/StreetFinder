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

    const [isUserListVisible, setIsUserListVisible] = useState(false);

    const toggleUserList = () => {
        setIsUserListVisible(!isUserListVisible);
    };

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
                    console.log('Broadcasted Message:', message.body);
                    try {
                        const messageData = JSON.parse(message.body);
                        if (messageData.gameState) setGameState(messageData.gameState);
                        if (messageData.users) setUsers(messageData.users);
                        if (messageData.coordinates) setCoordinates(messageData.coordinates);

                    } catch (error) {
                        console.error("Error parsing message:", error);
                    }
                });
                stompClient.current?.subscribe(`/user/${userId}/state`, (message) => {
                    console.log('Sent to you:', message.body);
                    try {
                        const messageData = JSON.parse(message.body);
                        if (messageData.gameState) setGameState(messageData.gameState);
                        if (messageData.users) setUsers(messageData.users);
                        if (messageData.coordinates) setCoordinates(messageData.coordinates);

                    } catch (error) {
                        console.error("Error parsing message:", error);
                    }
                });


                stompClient.current?.publish({
                    destination: '/app/game.start',
                    body: JSON.stringify({ userId: userId, username: username }),

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
    }, [backendUrl,session,userId,username]);

    useEffect(() => {
        const handleWin = () => {
            stompClient.current?.publish({
                destination: '/app/game.win',
                body: JSON.stringify({ username: username }),
            });
    
        };
        if (userCoordinates && coordinates) {
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
                const timer = setTimeout(() => {
                    setUserState("PLAYING");
                }, 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [userCoordinates, coordinates, username])


    return (
        <MultiplayerGameContext.Provider value={{ stompClient, gameState, users, connected, coordinates, userCoordinates, setUserCoordinates, userState, setUserState, photodate, setPhotodate }}>
            <div className="relative w-full h-full flex overflow-hidden z-0">
                {coordinates && (
                    <>
                        <div className="w-3/4 flex-grow">
                            <Panorama />
                        </div>
                        <div className="w-1/4 flex flex-col">
                            <div className="h-1/2 flex-grow overflow-auto">
                                <MultiplayerChat />
                            </div>
                            <div className="w-full h-1/2">
                                <Map />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MultiplayerGameContext.Provider>

    );
}
