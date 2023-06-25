"use client";

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const clientID = process.env.NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID;
const scriptUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientID}`;

const SatelliteMap: React.FC = ({setMap, showMap}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Function to initialize the Naver map
  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(35.876436, 128.625559),
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
  

  return (
    showMap ? (
    <div className="w-screen h-screen relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>) : null
    )
  
};

export default SatelliteMap;
