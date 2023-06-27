"use client";

import SkyDivingCanvas from '@/components/SkyDivingCanvas';
import SatelliteMap from '@/components/SatelliteMap';
import LandingPageController from '@/components/LandingPageController';
import { useState, useCallback } from 'react';
import LandingPanorama from '@/components/LandingPanorama';
import Link from 'next/link';
import { W } from 'drizzle-orm/query-promise.d-2e42fbc9';
import { redirect } from 'next/dist/server/api-utils';

// Home.js
const Home = () => {
  const [map, setMap] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);
  const [showMap, setShowMap] = useState(true);

  const handleZoomClick = useCallback(() => {
    setIsZooming(true);
    if (map) {
      const targetZoom = 22;
      const zoomStep = 1;
      let currentZoom = map.getZoom();
      
      const intervalId = setInterval(() => {
        currentZoom += zoomStep;
        if (currentZoom >= targetZoom) {
          map.setZoom(targetZoom, true);
          clearInterval(intervalId);
          setIsZooming(false); // Reset isZooming to false when zoom is complete
          setShowCanvas(false);
          setShowMap(false);
          window.location.replace('/../maptest')
        } else {
          map.setZoom(currentZoom, true);
        }
      }, 500);
    }
  }, [map]);

  return (
    <div className='relative overflow-hidden w-screen h-screen'>
      
      <SatelliteMap setMap={setMap} showMap={showMap} />
      <LandingPanorama />
      <SkyDivingCanvas isZooming={isZooming} showCanvas={showCanvas} />
      <LandingPageController onZoom={handleZoomClick} />

    </div>
  );
};

export default Home;