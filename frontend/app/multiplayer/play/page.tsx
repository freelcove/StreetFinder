"use client";

import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { useSession } from 'next-auth/react';
import { Client } from '@stomp/stompjs';
import MultiplayerChat from '../components/MultiplayerChat';
import UserList from '../components/UserList';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GameComponent() {
    const { data: session } = useSession();
    const [gameState, setGameState] = useState('');
    const username = session?.user?.name || '';
    const [connected, setConnected] = useState<boolean>(false);

    const stompClient = useRef<Client | null>(null);
    const [users, setUsers] = useState([]);

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


    const handleWin = () => {
        stompClient.current?.publish({
            destination: '/app/game.win',
            body: JSON.stringify({ sender: username }),
        });
    };

    return (
        <MultiplayerGameContext.Provider value={{ stompClient, gameState, users, connected }}>
            <div>
                <h1>Game State: {gameState}</h1>
                {gameState === 'IN_PROGRESS' && (
                    <button onClick={handleWin}>Win</button>
                )}
                <MultiplayerChat />
                <UserList users={users} />
            </div>
        </MultiplayerGameContext.Provider>
    );
}
