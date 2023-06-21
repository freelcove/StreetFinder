"use client";

import { useEffect, useRef, useState } from 'react';

export default function SatelliteMap(){
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

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);
    setMap(map);
  };

  // Function to load the Naver Maps script
  

  useEffect(() => {
    initMap();
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


