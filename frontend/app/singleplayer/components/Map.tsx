"use client";

import { useEffect, useRef, useContext } from 'react';
import { GameContext } from '../context/SingleplayerGameContext';

export default function Map() {

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const actualMarkerRef = useRef(null);
  const polylineRef = useRef(null);
  const { userCoordinates, coordinates, gameState, setUserCoordinates } = useContext(GameContext);

  const gameStateRef = useRef(gameState);


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
    polylineRef.current = new window.naver.maps.Polyline({
      map: mapInstanceRef.current,
      path: [],
      strokeColor: '#5347AA',
      strokeWeight: 2
    });

    window.naver.maps.Event.addListener(mapInstanceRef.current, "click", function (e: any) {
      if (gameStateRef.current === 'playing') {
        if (!userMarkerRef.current) {
          console.log("no marker")
          userMarkerRef.current = new window.naver.maps.Marker({
            position: e.coord,
            map: mapInstanceRef.current,
            icon: {
              url:'/image/marker_blue.png',
              scaledSize: new naver.maps.Size(30,30)
            }
          });
        }
        else {
          userMarkerRef.current.setPosition(e.coord);
        }
        setUserCoordinates({
          lat: e.coord.lat(),
          lng: e.coord.lng(),
        })
      }
    }
    );

  }, [setUserCoordinates]);


  useEffect(() => {

    if (gameState === 'results' && coordinates) {
      actualMarkerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
        map: mapInstanceRef.current,
        icon: {
          url:'/image/flag.png',
          scaledSize: new naver.maps.Size(50,50)
        }
      });

      mapInstanceRef.current.setCenter(userCoordinates)

      polylineRef.current.setPath([userCoordinates, coordinates]);
      polylineRef.current.setMap(mapInstanceRef.current);

      //TODO: set zoom according to the polyline distance
      let polylineDistance = polylineRef.current.getDistance()
      if (polylineDistance > 1000) {
        mapInstanceRef.current.setZoom(11, true);
      }


    }

    if (gameState === 'playing') {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      if (actualMarkerRef.current) {
        actualMarkerRef.current.setMap(null);
        actualMarkerRef.current = null;
      }
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current.setPath([]);


      }
    }

  }, [gameState, coordinates, userCoordinates]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full" />
  );
};

