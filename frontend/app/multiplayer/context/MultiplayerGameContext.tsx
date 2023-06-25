import { createContext } from 'react';
import { Client } from '@stomp/stompjs';

export const MultiplayerGameContext = createContext<{
    stompClient: React.MutableRefObject<Client | null>,
    gameState: string,
    users: string[],
    connected: boolean,
  }>({ stompClient: { current: null }, gameState: '', users: [], connected: false });
  