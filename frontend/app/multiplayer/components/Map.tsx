"use client";

import { useEffect, useRef, useContext } from 'react';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';

export default function Map() {

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const userMarkerRef = useRef<naver.maps.Marker | null>(null);
  const actualMarkerRef = useRef<naver.maps.Marker | null>(null);
  const polylineRef = useRef<naver.maps.Polyline | null>(null);
  const { userCoordinates, coordinates, gameState, setUserCoordinates, userState } = useContext(MultiplayerGameContext);
  const gameStateRef = useRef<string>(gameState);
  const userStateRef = useRef<string>(userState);

  // Create a map instance and assign it to mapInstanceRef.
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

    mapInstanceRef.current = new window.naver.maps.Map(mapRef.current!, mapOptions);
  };

  // Initialize map and setup click event listener
  useEffect(() => {
    initMap();
    polylineRef.current = new window.naver.maps.Polyline({
      map: mapInstanceRef.current!,
      path: [],
      strokeColor: '#5347AA',
      strokeWeight: 2
    });

    // Listener for map clicks
    window.naver.maps.Event.addListener(mapInstanceRef.current, "click", function (e: any) {
      if (gameStateRef.current === 'IN_PROGRESS' && userStateRef.current === 'PLAYING') {
        console.log(mapInstanceRef.current)
        if (!userMarkerRef.current) {
          userMarkerRef.current = new window.naver.maps.Marker({
            position: e.coord,
            map: mapInstanceRef.current!,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map based on gameState
  useEffect(() => {
    // Display actual marker and polyline when game state is 'DISPLAYING_RESULTS'
    if (gameState === 'DISPLAYING_RESULTS' && coordinates) {
      actualMarkerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
        map: mapInstanceRef.current!,
        icon: {
          url: '/image/flag.png',
          scaledSize: new naver.maps.Size(30, 30),
          anchor:new naver.maps.Point(3, 29.5)
        }
      });

      if (userCoordinates) {
        mapInstanceRef.current!.setCenter(userCoordinates)
        polylineRef.current!.setPath([userCoordinates, coordinates]);
        polylineRef.current!.setMap(mapInstanceRef.current);

        // Set zoom according to the polyline distance
        let polylineDistance = polylineRef.current!.getDistance()
        if (polylineDistance > 1000) {
          mapInstanceRef.current!.setZoom(11, true);
        }
      }
      else {
        mapInstanceRef.current!.setCenter(coordinates)
      }

    }

    // Clear all markers and polyline when game state is 'IN_PROGRESS'
    if (gameState === 'IN_PROGRESS') {
      if (userMarkerRef.current) {
        setUserCoordinates(null);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // Keep a reference to the gameState up to date
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    userStateRef.current = userState;
  }, [userState]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full" />
  );
  
};

