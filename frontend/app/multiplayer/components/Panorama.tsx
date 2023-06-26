"use client";
import { MultiplayerGameContext } from "../context/MultiplayerGameContext";
import { useEffect, useRef, useState, useContext } from "react";

export default function Panorama() {
  const panoRef = useRef<HTMLDivElement>(null);
  const { coordinates, photodate, setPhotodate } = useContext(
    MultiplayerGameContext,
  );
  const [panorama, setPanorama] = useState<naver.maps.Panorama | null>(null);

  

  useEffect(() => {
    const initPano = () => {
      if (!window.naver.maps.Panorama || !coordinates) {
        console.error(
          "Naver Maps Panorama script or coordinates are not loaded.",
        );
        return;
      }
      const panoOptions = {
        position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
        pov: {
          pan: -135,
          tilt: 0,
          fov: 120,
        },
        flightSpot: false,
        logoControl: false,
        zoomControl: false,
        aroundControl: false,
      };
      setPanorama(new window.naver.maps.Panorama(panoRef.current!, panoOptions));
    };

    initPano();
  }, []);

  useEffect(() => {
    if (panorama && coordinates) {
      const position = new window.naver.maps.LatLng(
        coordinates.lat,
        coordinates.lng,
      );
      panorama.setPosition(position);
      const timer = setTimeout(() => {
        setPhotodate(panorama.getLocation().photodate);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [panorama, coordinates, setPhotodate]);

  useEffect(() => {
    // window 크기에 따라 화면 resize
    const handleResize = () => {
      if (!panoRef.current) return;
      const parent = panoRef.current.parentElement;
      if (panorama && parent) {
        const size = { width: parent.offsetWidth, height: parent.offsetHeight };
        panorama.setSize(size);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (panorama) {
        panorama.destroy();
      }
    };
  }, [panorama]);

  return <div ref={panoRef} className="w-full h-full z-0" />;
}
