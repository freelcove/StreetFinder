"use client";

import { useEffect, useRef, useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';

export default function Panorama() {
    const panoRef = useRef<HTMLDivElement>(null);
    const {coordinates} = useContext(GameContext);
    const [panorama, setPanorama] = useState(null);

    const initPano = () => {
        if (!window.naver.maps.Panorama || !coordinates) {
            console.error('Naver Maps Panorama script is not loaded.');
            return;
        }
        const panoOptions = {
            position: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
            pov: {
                pan: -135,
                tilt: 29,
                fov: 100,
            },
            flightSpot: false,
        };
        setPanorama(new window.naver.maps.Panorama(panoRef.current, panoOptions));
    };

    useEffect(() => {
        initPano();
       
    }, []);

    useEffect(() => {
        if (panorama && coordinates) {
            const position = new window.naver.maps.LatLng(coordinates.lat, coordinates.lng);
            panorama.setPosition(position);
        }
    }, [coordinates]);

    useEffect(() => {
        const handleResize = () => {
            let size = { width: window.innerWidth, height: window.innerHeight }
            if (panorama) panorama.setSize(size);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [panorama]);



    return (
        <div ref={panoRef} className="w-full h-full" />
    );
};
