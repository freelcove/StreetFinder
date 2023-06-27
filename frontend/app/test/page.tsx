"use client";

import { useEffect, useRef } from 'react';

export default function PanoTest() {
    const panoRef = useRef<HTMLDivElement>(null);

    const initPano = () => {
        if (!window.naver.maps.Panorama) {
            console.error('Naver Maps Panorama script is not loaded.');
            return;
        }
        const panoOptions = {
            position: new window.naver.maps.LatLng(35.7713468, 128.6661269 ),
            pov: {
                pan: -135,
                tilt: 29,
                fov: 100,
            },
            flightSpot: false,
        };
        new window.naver.maps.Panorama(panoRef.current!, panoOptions);
    };

    useEffect(() => {
        initPano();
    }, []);

    return (
        <div className="w-screen h-screen">
            <div ref={panoRef} className="w-full h-full" />
        </div>
    );
};