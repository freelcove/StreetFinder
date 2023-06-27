import { useEffect, useRef, useState, useContext } from "react";
import { GameContext } from "../context/SingleplayerGameContext";
import Image from "next/image";

export default function Panorama() {
  const panoRef = useRef<HTMLDivElement>(null);
  const { coordinates } = useContext(GameContext);
  const [panorama, setPanorama] = useState<naver.maps.Panorama | null>(null);
  const [panoramaRotation, setPanoramaRotation] = useState(0);

  const initPano = () => {
    if (!window.naver.maps.Panorama || !coordinates) {
      console.error("Naver Maps Panorama script is not loaded.");
      return;
    }
    const panoOptions = {
      position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
      pov: {
        pan: -135,
        tilt: 0,
        fov: 100,
      },
      flightSpot: false,
      logoControl: false,
      zoomControl: false,
      aroundControl: false,
    };

    setPanorama(new window.naver.maps.Panorama(panoRef.current!, panoOptions));
  };

  useEffect(() => {
    initPano();
  }, []);

  useEffect(() => {
    if (panorama && coordinates) {
      const position = new window.naver.maps.LatLng(
        coordinates.lat,
        coordinates.lng,
      );
      panorama.setPosition(position);
    }
  }, [panorama, coordinates]);

  useEffect(() => {
    const handleResize = () => {
      let size = { width: window.innerWidth, height: window.innerHeight };
      if (panorama) panorama.setSize(size);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [panorama]);

  useEffect(() => {
    const handlePanoramaRotate = () => {
      if (panorama && panorama.getPov) {
        const pov = panorama.getPov();
        setPanoramaRotation(pov.pan!);
      }
    };
    const listener = panorama?.addListener("pov_changed", handlePanoramaRotate);

    return () => {
      panorama?.removeListener(listener!);
    };
  }, [panorama]);

  return (
    <div className="w-full h-full z-0 relative">
      <div ref={panoRef} className="w-full h-full" />
      <Image
        src="/image/compass.png"
        alt="Compass"
        className="compass-image"
        width="50"
        height="50"
        style={{
          transform: `rotate(${panoramaRotation}deg)`,
          position: "absolute",
          top: "10px",
          right: "10px",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
