import { createContext } from 'react';
import { Client } from '@stomp/stompjs';


type CoordinatesType = {
  lat: number;
  lng: number;
};

interface IUser {
  id: string;
  name: string;
  role: string;
  color: string;
}

interface IMultiplayerGameContext {
  stompClient: React.MutableRefObject<Client | null>;
  gameState: string;
  users: IUser[];
  connected: boolean;
  coordinates: CoordinatesType | null;
  userCoordinates: CoordinatesType | null;
  setUserCoordinates: React.Dispatch<React.SetStateAction<CoordinatesType | null>>;
  userState: string;
  setUserState: React.Dispatch<React.SetStateAction<string>>;
}

export const MultiplayerGameContext = createContext<IMultiplayerGameContext>({
  stompClient: { current: null },
  gameState: '',
  users: [],
  connected: false,
  coordinates: null,
  userCoordinates: null,
  setUserCoordinates: () => {},
  userState: '',
  setUserState: () => {},
});
