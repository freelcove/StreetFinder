"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Panorama from "@/app/singleplayer/components/Panorama";
import Map from "@/app/singleplayer/components/Map";
import { SingleplayerGameContext } from "../context/SingleplayerGameContext";
import Link from "next/link";
import { calculateDistance } from "@/app/utils/calculateDistance";
import Sample from "../../../public/json/test-sample-2.json";
import Result from "../components/Result";

export default function SingleplayerPlayPage() {
  // Define your state variables using React's useState hook
  const [gameState, setGameState] = useState("playing");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [times, setTimes] = useState(0);
  const [playList, setPlayList] = useState<Array<{
    id: number;
    name: string;
    visits: number;
  }> | null>([]);
  const [arr, setArr] = useState<Array<{
    id: number;
    name: string;
    visits: number;
  }> | null>([]);

  // Encapsulate the sample coordinates logic into a useCallback for efficiency
  const setSampleCoordinates = useCallback(async () => {
    let num = Math.floor(Math.random() * 50);
    let isDuple = arr!.some((item) => item.id === num);

    while (isDuple) {
      num = Math.floor(Math.random() * 50);
      isDuple = arr!.some((item) => item.id === num);
    }

    const data = await Sample.data[num];
    const newArr = [
      ...arr!,
      { id: num, name: data.place_name, visits: data.visits },
    ];

    setTimes((prevTimes) => prevTimes + 1);
    setCoordinates({ lat: data.lng, lng: data.lat });
    setArr(newArr);
    setPlayList(newArr);
  }, [arr]);

  useEffect(() => {
    setSampleCoordinates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (times > 5) {
      setGameState("GAMEOVER");
    }
  }, [times]);

  const handleButtonClick = () => {
    if (gameState === "playing" && coordinates && userCoordinates) {
      const dist = calculateDistance(
        userCoordinates.lat,
        userCoordinates.lng,
        coordinates.lat,
        coordinates.lng,
      );
      setDistance(dist);
      setGameState("results");
    } else {
      setSampleCoordinates();
      setUserCoordinates(null);
      setDistance(null);
      setGameState("playing");
    }
  };

  return (
    <SingleplayerGameContext.Provider
      value={{
        gameState,
        setGameState,
        coordinates,
        userCoordinates,
        setUserCoordinates,
        playList,
      }}
    >
      {gameState === "GAMEOVER" ? (
        <Result />
      ) : (
        coordinates && (
          <>
            <div className="relative w-full h-full overflow-hidden z-0">
              <div className="w-full h-full z-0">
                <Panorama />
              </div>
              <div className="absolute bottom-5 right-5 w-[20%] aspect-[4/3] bg-white opacity-40 hover:w-[30%] origin-bottom-right hover:opacity-100 transition-all duration-200 z-10">
                <Map />
                {distance && gameState === "results" && (
                  <div
                    className={`absolute top-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded
                                    ${
                                      distance <= 0.5
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    } text-white`}
                  >
                    {distance.toFixed(2)} km
                  </div>
                )}
                <button
                  onClick={handleButtonClick}
                  disabled={!userCoordinates}
                  className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 bg-blue-500 text-white px-4 py-2 rounded ${
                    !userCoordinates ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {gameState === "playing" ? "Guess" : "Next Game"}
                </button>
              </div>
              <Link href="/">
                <button className="absolute bottom-5 left-5 bg-blue-500 text-white px-4 py-2 rounded z-10">
                  Home
                </button>
              </Link>
            </div>
          </>
        )
      )}
    </SingleplayerGameContext.Provider>
  );
}
