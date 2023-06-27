"use client";

import { useEffect, useRef, useState } from 'react';

export default function SatelliteMap() {
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

    const map = new window.naver.maps.Map(mapRef.current!, mapOptions);
  };

  useEffect(() => {
    initMap();

  }, []);


  return (

    <div className="w-screen h-screen relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )

};

