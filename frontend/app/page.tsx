"use client";

import SkyDivingCanvas from '@/app/components/home/SkyDivingCanvas';
import SatelliteMap from '@/app/components/home/SatelliteMap';
import { useState, useCallback, Suspense, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

// Home.js
export default function Home() {

  enum Stage {
    LANDING,
    CHOOSE_MODE
  }

  const [map, setMap] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [homeState, setHomeState] = useState(Stage.LANDING);
  const [isLoading, setIsLoading] = useState(true);

  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(35.876436, 128.625559),
      zoom: 12,
      mapTypeId: "satellite",
      mapDataControl: false,
      logoControl: false,
      scaleControl: false,
    };

    const newMap = new window.naver.maps.Map(mapRef.current, mapOptions)
    setMap(newMap);

  };

  useEffect(() => {
    initMap();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);  // Set the timeout duration based on your loading time

    return () => clearTimeout(timer);
  }, []);


  const handleTitleClick = useCallback(() => {
    setIsZooming(true);

    const timer = setTimeout(() => {
      setIsZooming(false);
      setHomeState(Stage.CHOOSE_MODE);
    }, 500);

    return () => clearTimeout(timer);


  }, [map]);

  return (
    <div className='relative overflow-hidden w-screen h-screen z-0'>
      {isLoading && (
        <div className="absolute w-screen h-screen bg-white flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>)
      }
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex gap-10">
            <Link href="/singleplayer">
              <button className="text-3xl font-bold duration-300 ease-in-out hover:scale-105" >
                SINGLEPLAYER
              </button>
            </Link>
            <Link href="/multiplayer">
              <button className="text-3xl font-bold duration-300 ease-in-out hover:scale-105" >
                MULTIPLAYER
              </button>
            </Link>
            <Link href="/auth">
              <button className="text-3xl font-bold duration-300 ease-in-out hover:scale-105" >
                LOGIN
              </button>
            </Link>
          </div>
        </div>


      )
      }


    </div >
  );

};

