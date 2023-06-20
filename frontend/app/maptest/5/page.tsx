"use client";

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const clientID = process.env.NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID;
const scriptUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientID}`;

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  // Function to initialize the Naver map
  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(35.876822, 128.625527),
      zoom: 12,
      mapTypeId: "satellite",
      mapDataControl: false,
      logoControl: false,
      scaleControl: false,
    };

    const newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
  };

  // Function to load the Naver Maps script
  const loadScript = (callback: () => void) => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);
    script.onload = callback;

    return () => {
      document.body.removeChild(script);
    };
  };

  useEffect(() => {
    if (window.naver) {
      initMap();
    } else {
      // Load the script and initialize the map after the script is loaded
      const removeScript = loadScript(initMap);

      // Clean up function to remove the script when the component unmounts
      return removeScript;
    }
  }, []);

  const handleZoomClick = () => {
    if (map) {
      const targetZoom = 20;
      const zoomStep = 1; // Adjust this value for faster/slower zooming
      let currentZoom = map.getZoom();
      
      const intervalId = setInterval(() => {
        currentZoom += zoomStep;
        if (currentZoom >= targetZoom) {
          map.setZoom(targetZoom, true);
          clearInterval(intervalId);
        } else {
          map.setZoom(currentZoom, true);
        }
      }, 500); // Adjust this value for faster/slower zooming
    }
  };
  

  return (
    <div className="w-screen h-screen relative">
      <div ref={mapRef} className="w-full h-full" />

      {/* Adding the button */}
      <button onClick={handleZoomClick} className="absolute top-2 left-2 text-blue bg-slate-200 rounded bg-opacity-50 p-2">
        Zoom to Level 6
      </button>
    </div>
  );
};

export default MapComponent;
