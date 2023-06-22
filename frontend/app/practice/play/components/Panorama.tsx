"use client";

import { useEffect, useRef, useState } from 'react';

export default function Panorama() {
    const panoRef = useRef<HTMLDivElement>(null);
    let panorama = null;
    const initPano = () => {
        if (!window.naver.maps.Panorama) {
            console.error('Naver Maps Panorama script is not loaded.');
            return;
        }
        const panoOptions = {
            position: new window.naver.maps.LatLng(35.8301930000, 128.6183200000),
            pov: {
                pan: -135,
                tilt: 29,
                fov: 100,
            },
            flightSpot: false,
        };
        panorama = new window.naver.maps.Panorama(panoRef.current, panoOptions);
    };

    useEffect(() => {
        initPano();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            let size = { width: window.innerWidth, height: window.innerHeight }
            panorama.setSize(size);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div ref={panoRef} className="w-full h-full" />
    );
};
