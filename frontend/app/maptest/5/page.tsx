"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { stat } from "fs";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const clientID = process.env.NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID;
// interface Data {
//   coordinates: string;
// }

const MapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !mapLoaded) {
      if (session && session.accessToken) {
        fetch(`${backendUrl}/coordinates`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setMapLoaded(true);
            const loadMapScript = () => {
              const script = document.createElement("script");
              script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientID}`;
              script.async = true;
              script.onload = initializeMap;
              document.body.appendChild(script);
            };

            const initializeMap = () => {
              const mapOptions = {
                center: new window.naver.maps.LatLng(
                  data.latitude,
                  data.longitude,
                ),
                zoom: 10,
              };

              const map = new window.naver.maps.Map("map", mapOptions);
              const centerMarkerOptions = {
                position: new window.naver.maps.LatLng(
                  data.latitude,
                  data.longitude,
                ),
                map: map,
              };

              const centerMarker = new window.naver.maps.Marker(
                centerMarkerOptions,
              );
            };
            loadMapScript();
          })
          .catch((error) => {
            console.error("Error fetching coordinates:", error);
          });
      }
    }
  }, [status, session, mapLoaded, latitude, longitude]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }} />
      <p>위도: {latitude}</p>
      <p>경도: {longitude}</p>
    </div>
  );
};

export default MapComponent;
