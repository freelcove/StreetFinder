import { createContext } from "react";

interface CoordinatesType {
  lat: number;
  lng: number;
}

interface ISingleplayerGameContext {
  gameState: string;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
  coordinates: CoordinatesType | null;
  userCoordinates: CoordinatesType | null;
  setUserCoordinates: React.Dispatch<
    React.SetStateAction<CoordinatesType | null>
  >;
  playList: Array<{ id: number; name: string; visits: number }> | null;
}

export const SingleplayerGameContext = createContext<ISingleplayerGameContext>({
  gameState: "",
  setGameState: () => {},
  coordinates: null,
  userCoordinates: null,
  setUserCoordinates: () => {},
  playList: null,
});
