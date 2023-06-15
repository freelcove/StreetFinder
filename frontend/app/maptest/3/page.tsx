"use client";
import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        naver: any;
    }
}

const clientID = process.env.NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID;
const scriptUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientID}&submodules=panorama`;

const PanoComponent: React.FC = () => {
    
    const panoRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const initMap = () => {
        const map = new window.naver.maps.Map(mapRef.current, {
            center: new window.naver.maps.LatLng(37.3599605, 127.1058814),
            zoom: 17
        });

        const streetLayer = new window.naver.maps.StreetLayer();
        streetLayer.setMap(map);

        const pano = new window.naver.maps.Panorama(panoRef.current, {
            position: new window.naver.maps.LatLng(37.3599605, 127.1058814),
            pov: {
                pan: -135,
                tilt: 29,
                fov: 100,
            },
            flightSpot: false
        });

        window.naver.maps.Event.addListener(map, 'click', (e: any) => {
            if (streetLayer.getMap()) {
                const latlng = e.coord;
                pano.setPosition(latlng);
            }
        });

        window.naver.maps.Event.addListener(pano, 'pano_changed', () => {
            const latlng = pano.getPosition();
            if (!latlng.equals(map.getCenter())) {
                map.setCenter(latlng);
            }
        });
    };

    const loadScript = (url: string) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        if (!window.naver) {
            loadScript(scriptUrl)
                .then(() => {
                    window.naver.maps.onJSContentLoaded = () => {
                        initMap();
                    };
                })
                .catch((err) => console.error('Script loading error:', err));
        } else {
            initMap();
        }
    }, []);
    
    return (
        
        <div className="relative h-screen">
            <div ref={mapRef} className="absolute bottom-4 right-4 w-1/4 h-48 border border-gray-300 z-10"></div>
            <div ref={panoRef} className="absolute inset-0 w-full h-96 z-0"></div>
        </div>
    );
};

export default PanoComponent;
