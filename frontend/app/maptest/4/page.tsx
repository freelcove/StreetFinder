"use client";
import React, { useRef, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { stat } from "fs";
declare global {
  interface Window {
    naver: any;
    e: any;
  }
}
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const MapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { data: session, status } = useSession();
  const latInputRef = useRef<HTMLInputElement | null>(null);
  const lngInputRef = useRef<HTMLInputElement | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const panoRef = useRef<HTMLDivElement>(null);
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

            const initializeMap = () => {
              const mapOptions = {
                center: new window.naver.maps.LatLng(35.8714354, 128.601445),
                zoom: 10,
              };

              const map = new window.naver.maps.Map("map", mapOptions);

              const streetLayer = new window.naver.maps.StreetLayer();
              streetLayer.setMap(map);

              window.naver.maps.Event.addListener(
                map,
                "click",
                function (e: any) {
                  marker.setPosition(e.latlng);

                  if (latInputRef.current && lngInputRef.current) {
                    latInputRef.current.value = e.coord.lat();
                    lngInputRef.current.value = e.coord.lng();
                    const proj = map.getProjection();
                    const startLatLng = new window.naver.maps.LatLng(
                      data.latitude,
                      data.longitude,
                    );
                    const endLatLng = new window.naver.maps.LatLng(
                      parseFloat(latInputRef.current.value),
                      parseFloat(lngInputRef.current.value),
                    );

                    const distance =
                      proj.getDistance(startLatLng, endLatLng) / 1000;
                    setDistance(distance);
                  }
                  // if (streetLayer.getMap()) {
                  //   const latlng = e.coord;
                  //   pano.setPosition(latlng);
                  // }
                },
              );
              const markerOptions = {
                position: new window.naver.maps.LatLng(
                  latInputRef,
                  lngInputRef,
                ),
                map: map,
                // icon: {
                //   url: "/image/location.png",
                //   size: new naver.maps.Size(80, 85),
                //   //origin: new naver.maps.Point(0, 0),
                //   //anchor: new naver.maps.Point(11, 35),
                // },
              };
              const marker = new window.naver.maps.Marker(markerOptions);
              const panoOptions = {
                position: new window.naver.maps.LatLng(
                  data.latitude,
                  data.longitude,
                ),
                pov: {
                  pan: -135,
                  tilt: 29,
                  fov: 100,
                },
                flightSpot: false,
              };
              console.log(data.latitude);
              const pano = new window.naver.maps.Panorama(
                panoRef.current,
                panoOptions,
              );
              window.naver.maps.Event.addListener(pano, "pano_changed", () => {
                const latlng = pano.getPosition();
                if (!latlng.equals(map.getCenter())) {
                  map.setCenter(latlng);
                }
              });
            };
            initializeMap();
          })
          .catch((error) => {
            console.error("Error fetching coordinates:", error);
          });
      }
    }
  }, [status, session, mapLoaded, latitude, longitude]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70%" }}>
        <div ref={panoRef} style={{ width: "100%", height: "1000px" }}></div>
      </div>
      <div style={{ width: "30%", position: "relative" }}>
        <div id="map" style={{ width: "100%", height: "300px" }}></div>
        <div>
          <p>시작점 위도: {latitude}</p>
          <p>시작점 경도: {longitude}</p>
        </div>
        <div style={{ textAlign: "left" }}>
          <p>
            사용자가 클릭한 위도:{" "}
            <input type="text" name="namp_lat" ref={latInputRef} readOnly />
          </p>
          <p>
            사용자가 클릭한 경도:{" "}
            <input type="text" name="namp_lng" ref={lngInputRef} readOnly />
          </p>
        </div>
        <div style={{ textAlign: "left" }}>
          {distance && <p>Distance: {distance.toFixed(2)} km</p>}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
