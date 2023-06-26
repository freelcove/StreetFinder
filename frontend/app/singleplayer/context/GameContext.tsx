import { createContext } from 'react';

interface IUserCoordinate {
  lat: number;
  lng: number;
}

interface IMultiplayerGameContext {
  gameState: string;
  coordinates: IUserCoordinate | null;
  userCoordinates: IUserCoordinate | null;
  setUserCoordinates: React.Dispatch<React.SetStateAction<IUserCoordinate | null>>;
  userState: string;
  setUserState: React.Dispatch<React.SetStateAction<string>>;
  photodate: string;
  setPhotodate: React.Dispatch<React.SetStateAction<string>>;
}

export const GameContext = createContext<IMultiplayerGameContext>({
  gameState: '',
  coordinates: null,
  userCoordinates: null,
  setUserCoordinates: () => {},
  userState: '',
  setUserState: () => {},
  photodate: '',
  setPhotodate: () => {},
});
