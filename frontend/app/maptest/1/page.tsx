"use client";

import { useEffect, useRef } from 'react';

export default function MapTest() {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (!window.naver) {
      console.error('Naver Maps script is not loaded.');
      return;
    }

    const mapOptions = {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };
    new window.naver.maps.Map(mapRef.current, mapOptions);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};


