import { useEffect, useRef, useState, useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function Panorama() {
  const panoRef = useRef<HTMLDivElement>(null);
  const { coordinates } = useContext(GameContext);
  const [panorama, setPanorama] = useState(null);
  const [panoramaRotation, setPanoramaRotation] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

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

    setPanorama(new window.naver.maps.Panorama(panoRef.current, panoOptions));
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
  }, [coordinates]);

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
        setPanoramaRotation(pov.pan);
      }
    };

    if (panorama) {
      panorama.addListener("pov_changed", handlePanoramaRotate);
    }

    return () => {
      if (panorama) {
        panorama.removeListener("pov_changed", handlePanoramaRotate);
      }
    };
  }, [panorama]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
    if (panorama) {
      panorama.setOptions({ clickable: false });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    if (panorama) {
      panorama.setOptions({ clickable: true });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;

    const { movementX, movementY } = event.nativeEvent;
    const rotationSpeed = 0.2; // 파노라마 동작 속도 조절 (값이 클수록 느림)

    if (panorama) {
      const pov = panorama.getPov();
      const newPan = pov.pan - movementX * rotationSpeed;
      const newTilt = pov.tilt - movementY * rotationSpeed;
      panorama.setPov({ pan: newPan, tilt: newTilt, fov: pov.fov });
    }
  };

  return (
    <div
      className="w-full h-full z-0 relative"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div ref={panoRef} className="w-full h-full" />
      <img
        src="/image/compass.png"
        alt="Compass"
        className="compass-image"
        style={{
          transform: `rotate(${panoramaRotation}deg)`,
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "50px",
          height: "50px",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
