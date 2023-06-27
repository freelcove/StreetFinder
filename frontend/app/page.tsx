"use client";

import SkyDivingCanvas from "@/app/components/home/SkyDivingCanvas";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SignIn from "./auth/signin/page";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { warmupRequest } from "./utils/warmupRequest";

export default function Home() {
  enum Stage {
    LANDING,
    CHOOSE_MODE,
  }
  const { data: session } = useSession();

  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [homeState, setHomeState] = useState(Stage.LANDING);
  const [isLoading, setIsLoading] = useState(true);

  const mapRef = useRef<HTMLDivElement>(null);

  const isLogged = session?.user ? true : false;

  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(35.876436, 128.625559),
      zoom: 12,
      mapTypeId: "satellite",
      mapDataControl: false,
      logoControl: false,
      scaleControl: false,
    };
    let newMap = null;
    if (mapRef.current !== null) {
      newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
    }
  };

  useEffect(() => {
    initMap();
    warmupRequest();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Set the timeout duration based on your loading time

    return () => clearTimeout(timer);
  }, []);

  const handleTitleClick = useCallback(() => {
    setIsZooming(true);

    const timer = setTimeout(() => {
      setIsZooming(false);
      setHomeState(Stage.CHOOSE_MODE);
    }, 500);

    return () => clearTimeout(timer);
  }, [Stage.CHOOSE_MODE]);

  return (
    <div className="relative overflow-hidden w-screen h-screen z-0">
      {isLoading && (
        <div className="absolute w-screen h-screen bg-white flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
      <SkyDivingCanvas isZooming={isZooming} />
      {homeState === Stage.LANDING && (
        <>
          <Image
            src="/image/title1.png"
            loading="eager"
            width={380}
            height={380}
            alt="STREET FINDER"
            onClick={() => {
              handleTitleClick();
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out hover:scale-105"
          />
        </>
      )}
      {homeState === Stage.CHOOSE_MODE && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-10">
          <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-3">SINGLEPLAYER</h2>
            <p>Some introduction to Singleplayer mode.</p>
            <Link href="/singleplayer">
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Play
              </button>
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-3">MULTIPLAYER</h2>
            <p>Some introduction to Multiplayer mode.</p>
            {!isLogged ? (
              <SignIn />
            ) : (
              <Link href="/multiplayer">

                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                  Play
                </button>
              </Link>

            )}
          </div>
        </div>
      )}
      {isLogged ? (
        <div className="absolute bottom-0 right-0 mb-3 mr-3">
          <button
            className="text-2xl font-bold duration-300 ease-in-out hover:scale-105"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
