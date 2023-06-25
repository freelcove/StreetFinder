"use client";

import SkyDivingCanvas from '@/app/components/home/SkyDivingCanvas';
import SatelliteMap from '@/app/components/home/SatelliteMap';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image'

import { HomeContext } from './context/HomeContext';

// Home.js
export default function Home() {

  enum Stage {
    LANDING,
    CHOOSE_MODE
  }

  const [map, setMap] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [homeState, setHomeState] = useState(Stage.LANDING);

  const handleZoomClick = useCallback(() => {
    setIsZooming(true);
    if (map) {
      const targetZoom = 13;
      const zoomStep = 1;
      let currentZoom = map.getZoom();

      const intervalId = setInterval(() => {
        currentZoom += zoomStep;
        if (currentZoom >= targetZoom) {
          map.setZoom(targetZoom, true);
          clearInterval(intervalId);
          setIsZooming(false); // Reset isZooming to false when zoom is complete

        } else {
          map.setZoom(currentZoom, true);
        }
      }, 1000);
    }
  }, [map]);

  return (
    <HomeContext.Provider value={{ homeState, setHomeState }}>
      <div className='relative overflow-hidden w-screen h-screen'>
        <SatelliteMap />
        <SkyDivingCanvas isZooming={isZooming} />
        {homeState === Stage.LANDING && (
          <>
            <Image
              src="/image/title1.png"
              loading="eager"
              width={380}
              height={380}
              alt="STREET FINDER"
              // onClick={() => setHomeState(Stage.CHOOSE_MODE)}  // set state to CHOOSE_MODE when the image is clicked
              onClick={handleZoomClick}  // set state to CHOOSE_MODE when the image is clicked
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out hover:scale-105"
            />
          </>
        )}
        {homeState === Stage.CHOOSE_MODE && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-10">
            <Link href="/singleplayer">
              <button className="text-xl font-bold" >
                SINGLEPLAYER
              </button>
            </Link>
            <Link href="/singleplayer">
              <button className="text-xl font-bold" >
                MULTIPLAYER
              </button>
            </Link>
              </div>
          </div>
        )}

      </div>
    </HomeContext.Provider>
  );

};

