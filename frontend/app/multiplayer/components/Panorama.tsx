"use client";
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';
import { useEffect, useRef, useState, useContext } from 'react';

export default function Panorama() {
    const panoRef = useRef<HTMLDivElement>(null);
    const {coordinates, photodate, setPhotodate} = useContext(MultiplayerGameContext);
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
                tilt: 25,
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
            const position = new window.naver.maps.LatLng(coordinates.lat, coordinates.lng);
           //TODO: find a way to get photodate after initPano
            console.log(panorama.getLocation().photodate)


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

    useEffect(() => {

        return () => {
            // Clean up on unmount
            if (panorama) {
                panorama.destroy();
            }
        };
    }, [panorama]);



    return (
        <div ref={panoRef} className="w-full h-full z-0" />
    );
};
