"use client";

import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        naver: any;
    }
}

const clientID = process.env.NEXT_PUBLIC_NAVER_MAPS_API_CLIENT_ID;
const scriptUrlWithSubmodule = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientID}&submodules=panorama`;

const LandingPanorama: React.FC = () => {
    const panoRef = useRef<HTMLDivElement>(null);

    const initPano = () => {

        if (window.naver && window.naver.maps.Panorama) {
            const panoOptions = {
                position: new window.naver.maps.LatLng(35.876436, 128.625559),
                pov: {
                    pan: 16,
                    tilt: 17,
                    fov: 100,
                },
                flightSpot: false,
            };

            new window.naver.maps.Panorama(panoRef.current, panoOptions);
        }
    };

    const loadScript = (url: any) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    const waitForNaver = (callback: any) => {
        const maxAttempts = 20; // Maximum number of attempts to check
        let attempts = 0; // The number of times we've tried to check

        const interval = setInterval(() => {
            attempts++;

            // If window.naver is loaded or we've tried the max attempts, clear the interval
            if (window.naver || attempts > maxAttempts) {
                clearInterval(interval);
            }

            // If window.naver is loaded, call the callback function
            if (window.naver) {
                callback();
            }
        }, 500); // check every 500ms
    };

    useEffect(() => {
        if (!window.naver) {
            loadScript(scriptUrlWithSubmodule)
                .then(() => {
                    waitForNaver(initPano);
                })
                .catch((err) => console.error('Script loading error:', err));
        } else {
            initPano();
        }
    }, []);


    return (
        <div className="w-screen h-screen">
            <div ref={panoRef} className="w-full h-full" />;
        </div>
    )
};

export default LandingPanorama;
