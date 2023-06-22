"use client";

import { useEffect, useRef, useContext } from 'react';
import { GameContext } from '../context/GameContext';

export default function Map() {

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const actualMarkerRef = useRef(null);
  const { userCoordinates, coordinates, gameStatus, setUserCoordinates } = useContext(GameContext);

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
    mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, mapOptions);
  };

  useEffect(() => {

    initMap();




    window.naver.maps.Event.addListener(mapInstanceRef.current, "click", function (e: any) {
      if (!userMarkerRef.current) {
        userMarkerRef.current = new window.naver.maps.Marker({
          position: e.coord,
          map: mapInstanceRef.current,
        });
      }
      else {
        userMarkerRef.current.setPosition(e.coord);
      }
      
      setUserCoordinates({
        lat: e.coord.lat(),
        lng: e.coord.lng(),
      })
    });
    

  }, []);


  useEffect(() => {
    if (gameStatus === 'results' && coordinates) {
      actualMarkerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
        map: mapInstanceRef.current,
      });
    }
  
    if (gameStatus === 'playing') {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      if (actualMarkerRef.current) {
        actualMarkerRef.current.setMap(null);
        actualMarkerRef.current = null;
      }
    }
  
  }, [gameStatus, coordinates]);


  return (
    <div ref={mapRef} className="w-full h-full" />
  );
};

