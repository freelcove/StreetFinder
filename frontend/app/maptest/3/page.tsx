"use client";
import { useEffect, useRef } from "react";

export default function MapPanoTest() {
  const panoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const initMapPano = () => {
    if (!window.naver.maps.Panorama) {
      console.error("Naver Maps script is not loaded.");
    }
    // initialize map
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };
    const map = new window.naver.maps.Map(mapRef.current, mapOptions);
    const streetLayer = new window.naver.maps.StreetLayer();
    streetLayer.setMap(map);

    // initialize panorama
    const panoOptions = {
      position: new window.naver.maps.LatLng(37.3599605, 127.1058814),
      pov: {
        pan: -135,
        tilt: 29,
        fov: 100,
      },
      flightSpot: false,
    };
    const pano = new window.naver.maps.Panorama(panoRef.current, panoOptions);

    window.naver.maps.Event.addListener(map, "click", (e: any) => {
      if (streetLayer.getMap()) {
        const latlng = e.coord;
        pano.setPosition(latlng);
      }
    });

    window.naver.maps.Event.addListener(pano, "pano_changed", () => {
      const latlng = pano.getPosition();
      if (!latlng.equals(map.getCenter())) {
        map.setCenter(latlng);
      }
    });
  };

  useEffect(() => {
    initMapPano();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div ref={panoRef} className="relative w-full h-full z-0">
        <div
          ref={mapRef}
          className="absolute w-1/4 h-1/4 z-10 transform transition-transform duration-500 hover:scale-150 origin-top-left"
        ></div>
      </div>
    </div>
  );
}
