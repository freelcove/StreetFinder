"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Panorama from "@/app/singleplayer/components/Panorama";
import Map from "@/app/singleplayer/components/Map";
import { SingleplayerGameContext } from '../context/SingleplayerGameContext';
import Link from 'next/link';
import { calculateDistance } from '@/app/utils/calculateDistance';
import Sample from "../../../public/json/test-sample-2.json";
import { redirect } from 'next/navigation';
import { list } from 'postcss';
import Result from '../components/Result';

export default function SingleplayerPlayPage() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { data: session, status } = useSession();
    const [gameState, setGameState] = useState('playing');
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number; } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [times, setTimes] = useState(null);
    const [playList, setPlayList] = useState<Array<{id: number, name: string, visits:number}> | null>(null);
    let count = 0;
    let arr = new Array<{ id: number, name: string, visits: number }>;

    const setSampleCoordinates = useCallback(async () => {
        let num = Math.floor(Math.random() * 50);
        let isDuple = true;
        if (arr[0] != null) {
            // while (isDuple) {
            //     console.log("checkDuple");
            // }
            while (isDuple) {
                arr.forEach(item => {
                    isDuple = false;
                    if (item.id == num) {
                        num = Math.floor(Math.random() * 50);
                        isDuple = true;
                        return;
                    }
                });
                console.log("isDuple:" + isDuple);
            }

        }
        console.log("num:" + num);
        console.log(arr);
        count++;
        await setTimes(count);
        if (count != 6) {
            const data = await Sample.data[num];
            console.log(data.lat);
            console.log(data.lng);
            console.log(data.place_name);
            arr.push({ id: num, name: data.place_name, visits: data.visits });
            await setCoordinates({
                lat: data.lng,
                lng: data.lat
            });
            await setPlayList(arr);
        }
        console.log("-----------------------");

    }, [])

    useEffect(() => {
        setSampleCoordinates();
    }, []);
    useEffect(() => {
        if (times > 5 && times != null) {

            setGameState('GAMEOVER');
        }

    }, [times])

    // Handle Guess/Next game button click
    const handleButtonClick = () => {
        if (gameState === 'playing' && coordinates && userCoordinates) {
            const dist = calculateDistance(
                userCoordinates.lat,
                userCoordinates.lng,
                coordinates.lat,
                coordinates.lng
            );
            setDistance(dist);
            setGameState('results');

        } else {
            setSampleCoordinates();
            setUserCoordinates(null);
            setDistance(null);
            setGameState('playing');
        }
    };

    useEffect(() => {
        console.log(gameState);
    }, [gameState]);

    return (
        <SingleplayerGameContext.Provider value={{ gameState, setGameState, coordinates, userCoordinates, setUserCoordinates, playList }}>
          {gameState === 'GAMEOVER' ?
            <Result />
            :
            (coordinates && (
              <>
                <div className="relative w-full h-full overflow-hidden z-0">
                  <div className="w-full h-full z-0">
                    <Panorama />
                  </div>
                  <div className="absolute bottom-5 right-5 w-[20%] aspect-[4/3] bg-white opacity-40 hover:w-[30%] origin-bottom-right hover:opacity-100 transition-all duration-200 z-10">
                    <Map />
                    {distance && gameState === 'results' && (
                      <div
                        className={`absolute top-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded
                                    ${distance <= 0.5 ? 'bg-green-500' : 'bg-red-500'} text-white`}
                      >
                        {distance.toFixed(2)} km
                      </div>
                    )}
                    <button onClick={handleButtonClick} disabled={!userCoordinates} className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 bg-blue-500 text-white px-4 py-2 rounded ${!userCoordinates ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {gameState === 'playing' ? 'Guess' : 'Next Game'}
                    </button>
                  </div>
                  <Link href="/">
                    <button className="absolute bottom-5 left-5 bg-blue-500 text-white px-4 py-2 rounded z-10">
                      Home
                    </button>
                  </Link>
                </div>
              </>
            ))
          }
        </SingleplayerGameContext.Provider>
      )
}