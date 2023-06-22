"use client";

import { useEffect, useRef } from 'react';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  let map = null;
  const initMap = () => {
    if (!window.naver) {
      console.error('Naver Maps script is not loaded.');
      return;
    }
    
    const mapOptions = {
      center: new window.naver.maps.LatLng(35.8714354, 128.601445),
      zoom: 11,
      mapTypeControl: false,
      scaleControl: false,
      mapDataControl: false,
      logoControl: false,

    };
    map = new window.naver.maps.Map(mapRef.current, mapOptions);
  };



  useEffect(() => {
    initMap();
  }, []);


  return (
    <div ref={mapRef} className="w-full h-full" />
  );
};

