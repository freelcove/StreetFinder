"use client";

import { useRef, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MapComponent() {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null);
  const { data: session, status } = useSession();
  const [distance, setDistance] = useState<number | null>(null);
  const [map, setMap] = useState<any>(null);

  const panoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const latInputRef = useRef<HTMLInputElement | null>(null);
  const lngInputRef = useRef<HTMLInputElement | null>(null);

  const fetchAndSetCoordinates = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch(`${backendUrl}/coordinates`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        setCoordinates({
          latitude: data.latitude,
          longitude: data.longitude
        });

      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  }

  useEffect(() => {
    fetchAndSetCoordinates();
  }, [session, backendUrl]);

  useEffect(() => {
    if (!window.naver || !coordinates) {
      console.error('Naver Maps script is not loaded.');
      return;
    }

    const mapOptions = {
      center: new window.naver.maps.LatLng(35.8714354, 128.601445),
      zoom: 12,
    };

    const newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    const panoOptions = {
      position: new window.naver.maps.LatLng(coordinates.latitude, coordinates.longitude),
      pov: {
        pan: -135,
        tilt: 29,
        fov: 100,
      },
      flightSpot: false,
    };

    const pano = new window.naver.maps.Panorama(panoRef.current, panoOptions);

  }, [coordinates]);

  useEffect(() => {
    if (!map) {
      console.log("no map")
      return;
    }
    let marker = null;
    window.naver.maps.Event.addListener(map, "click", function (e: any) {
      
      if (!marker) {
        console.log("no marker")
        marker = new window.naver.maps.Marker({
          position: e.coord,
          map: map,
        });
      }
      else {
        console.log("marker")
        marker.setPosition(e.coord);
            }

      if (latInputRef.current && lngInputRef.current) {
        latInputRef.current.value = e.coord.lat();
        lngInputRef.current.value = e.coord.lng();
        const proj = map.getProjection();
        const startLatLng = new window.naver.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude,
        );
        const endLatLng = new window.naver.maps.LatLng(
          parseFloat(latInputRef.current.value),
          parseFloat(lngInputRef.current.value),
        );

        const distance =
          proj.getDistance(startLatLng, endLatLng) / 1000;
        setDistance(distance);
      }
    });
  }, [map, coordinates]);

  return (
    <div className="flex h-full w-full">
      <div ref={panoRef} className="w-full h-[1000px]"></div>
      <div className="w-3/10 relative">
        <div ref={mapRef} className="w-full h-[300px]"></div>
        <div>
          <p>시작점 위도: {coordinates?.latitude}</p>
          <p>시작점 경도: {coordinates?.longitude}</p>
        </div>
        <div className="text-left">
          <p>
            사용자가 클릭한 위도: <input type="text" name="namp_lat" ref={latInputRef} readOnly />
          </p>
          <p>
            사용자가 클릭한 경도: <input type="text" name="namp_lng" ref={lngInputRef} readOnly />
          </p>
        </div>
        <div className="text-left">
          {distance && <p>Distance: {distance.toFixed(2)} km</p>}
        </div>
        <button onClick={fetchAndSetCoordinates} className="font-bold">Update Coordinates</button>
      </div>
    </div>
  );
}
