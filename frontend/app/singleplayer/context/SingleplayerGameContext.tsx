import { createContext } from 'react';

interface CoordinatesType {
  lat: number;
  lng: number;
}

interface ISinglePlayerGameContext {
  gameState: string;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
  coordinates: CoordinatesType | null;
  userCoordinates: CoordinatesType | null;
  setUserCoordinates: React.Dispatch<React.SetStateAction<CoordinatesType | null>>;
}

export const SinglePlayerGameContext = createContext<ISinglePlayerGameContext>({
  gameState: '',
  setGameState: () => {},
  coordinates: null,
  userCoordinates: null,
  setUserCoordinates: () => {},
});
