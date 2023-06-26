import { createContext } from 'react';
import { Client } from '@stomp/stompjs';

interface IUserCoordinate {
  lat: number;
  lng: number;
}

interface IMultiplayerGameContext {
  stompClient: React.MutableRefObject<Client | null>;
  gameState: string;
  users: string[];
  connected: boolean;
  coordinates: IUserCoordinate | null;
  userCoordinates: IUserCoordinate | null;
  setUserCoordinates: React.Dispatch<React.SetStateAction<IUserCoordinate | null>>;
  userState: string;
  setUserState: React.Dispatch<React.SetStateAction<string>>;
  photodate: string;
  setPhotodate: React.Dispatch<React.SetStateAction<string>>;
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
  photodate: '',
  setPhotodate: () => {},
});
