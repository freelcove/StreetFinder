"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { start } from "repl";

declare global {
  interface Window {
    naver: any;
    e: any;
  }
}

const MapComponent = () => {
  const latInputRef = useRef<HTMLInputElement | null>(null);
  const lngInputRef = useRef<HTMLInputElement | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [polyline, setPolyline] = useState<any | null>(null);
  useEffect(() => {
    const clientID = process.env.NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID;

    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientID}`;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    };

    const initializeMap = () => {
      const start_lat = 37.3595704;
      const start_lng = 127.105399;
      const mapOptions = {
        center: new window.naver.maps.LatLng(start_lat, start_lng),
        zoom: 10,
      };
      const map = new window.naver.maps.Map("map", mapOptions);

      const CentermarkerOptions = {
        position: new window.naver.maps.LatLng(37.3595704, 127.105399),
        map: map,
      };
      const marker_center = new window.naver.maps.Marker(CentermarkerOptions);
      window.naver.maps.Event.addListener(map, "click", function (e: any) {
        if (polyline) {
          polyline.setMap(null);
        }

        marker.setPosition(e.latlng);

        if (latInputRef.current && lngInputRef.current) {
          latInputRef.current.value = e.coord.lat();
          lngInputRef.current.value = e.coord.lng();
          const proj = map.getProjection();
          const startLatLng = new window.naver.maps.LatLng(
            start_lat,
            start_lng,
          );
          const endLatLng = new window.naver.maps.LatLng(
            parseFloat(latInputRef.current.value),
            parseFloat(lngInputRef.current.value),
          );

          const newPolyline = new window.naver.maps.Polyline({
            map: map,
            path: [startLatLng, endLatLng],
            strokeColor: "#5347AA",
            strokeWeight: 2,
          });
          setPolyline(newPolyline);

          const distance = proj.getDistance(startLatLng, endLatLng) / 1000;
          setDistance(distance);
        }
        // console.log(e.coord.lat());
        // console.log(e.coord.lng());
      });
      const markerOptions = {
        position: new window.naver.maps.LatLng(latInputRef, lngInputRef),
        map: map,
      };
      const marker = new window.naver.maps.Marker(markerOptions);
    };
    loadMapScript();

    return () => {
      const script = document.querySelector("script[src*='naver']");
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }} />
      <div style={{ textAlign: "left" }}>
        위도 : <input type="text" name="namp_lat" ref={latInputRef} readOnly />
        경도 : <input type="text" name="namp_lng" ref={lngInputRef} readOnly />
      </div>
      <div style={{ textAlign: "left" }}>
        {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      </div>
    </div>
  );
};

export default MapComponent;
