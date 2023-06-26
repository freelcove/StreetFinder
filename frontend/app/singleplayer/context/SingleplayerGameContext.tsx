import { createContext } from 'react';

interface IUserCoordinate {
  lat: number;
  lng: number;
}

interface ISinglePlayerGameContext {
  gameState: string;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
  coordinates: IUserCoordinate | null;
  userCoordinates: IUserCoordinate | null;
  setUserCoordinates: React.Dispatch<React.SetStateAction<IUserCoordinate | null>>;
  photodate: string;
  setPhotodate: React.Dispatch<React.SetStateAction<string>>;
}

export const GameContext = createContext<ISinglePlayerGameContext>({
  gameState: '',
  setGameState: () => {},
  coordinates: null,
  userCoordinates: null,
  setUserCoordinates: () => {},
  photodate: '',
  setPhotodate: () => {},
});
