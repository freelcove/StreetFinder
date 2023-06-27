"use client";

import { useEffect, useRef, useState } from "react";
import { debounce } from "@/app/utils/debounce";

type CoordinatesType = {
  lat: number;
  lng: number;
};

type UsePanoramaParams = {
  coordinates: CoordinatesType | null;
};

export const usePanorama = ({ coordinates }: UsePanoramaParams) => {
  const panoRef = useRef<HTMLDivElement>(null);
  const [panorama, setPanorama] = useState<naver.maps.Panorama | null>(null);

  const initPano = () => {
    if (!window.naver.maps.Panorama) {
      console.error("Naver Maps Panorama script or coordinates are not loaded.");
      return;
    }

    const panoOptions = {
      position: new window.naver.maps.LatLng(coordinates!.lat, coordinates!.lng),
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

    // Create a new panorama instance and save it in the state
    setPanorama(new window.naver.maps.Panorama(panoRef.current!, panoOptions));
  };


  useEffect(() => {
    initPano();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the position of the panorama instance whenever coordinates change
  useEffect(() => {
    if (panorama && coordinates) {
      const position = new window.naver.maps.LatLng(
        coordinates.lat,
        coordinates.lng,
      );
      panorama.setPosition(position);

    }
  }, [panorama, coordinates]);

  // Update panorama size when window resizes, and cleanup when component is unmounted
  useEffect(() => {
    const handleResize = () => {
      if (!panoRef.current) return;
      const parent = panoRef.current.parentElement;
      if (panorama && parent) {
        const size = { width: parent.offsetWidth, height: parent.offsetHeight };
        panorama.setSize(size);
      }
    };
    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [panorama]);

  return panoRef;
};




// useEffect(() => {
//   const handlePanoramaRotate = () => {
//     if (panorama && panorama.getPov) {
//       const pov = panorama.getPov();
//       setPanoramaRotation(pov.pan!);
//     }
//   };
//     const listener = panorama?.addListener("pov_changed", handlePanoramaRotate);

//   return () => {
//       panorama?.removeListener(listener!);
//   };
// }, [panorama]);



// return (
//   <div className="w-full h-full z-0 relative">
//     <div ref={panoRef} className="w-full h-full" />
//     <Image
//       src="/image/compass.png"
//       alt="Compass"
//       className="compass-image"
//       width="50"
//       height="50"
//       style={{
//         transform: `rotate(${panoramaRotation}deg)`,
//         position: "absolute",
//         top: "10px",
//         right: "10px",
//         transition: "transform 0.3s ease-in-out",
//       }}
//     />
//   </div>
// );
// }