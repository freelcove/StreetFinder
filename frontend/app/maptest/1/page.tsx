"use client";

import { isNull } from 'drizzle-orm';
import { useEffect, useRef, useState } from 'react';

export default function MapTest() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [position, setPosotion] = useState<Map<String,Object>>({"condition":"empty"});
  useEffect(() => {
    fetch("http://localhost:8080/api/position/each")
    .then(res =>res.json())
    .then(res =>setPosotion(res.data[0]))
  }, []);

  let lat;
  let lon;
  


  const initMap = () => {
    if (!window.naver) { 
      console.error('Naver Maps script is not loaded.');
      return;
    }
    if(position.condition=="empty"){
      lat = 127.105399;
      lon = 37.3595704;
    } else {
      lat=position.latitude;
      lon=position.longitude;
    }
    const mapOptions = {
      center: new window.naver.maps.LatLng(lon, lat),
      zoom: 10,
    };
    new window.naver.maps.Map(mapRef.current, mapOptions);
  };


  useEffect(() => {
    if(position.condition=="empty"){

    } else {

      initMap();
      console.log(position);
    }
    
  }, [position]);

  return (
    <div className="w-screen h-screen">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};


