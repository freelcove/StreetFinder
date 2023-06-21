"use client";
import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';


function MovingClouds({ isZooming }) {
    // Load the cloud texture
    const cloudTexture = useLoader(THREE.TextureLoader, '/image/cloud1.png');
    const cloudRefs = useRef([]);

    useFrame(() => {
        // Move clouds forward in every frame
        cloudRefs.current.forEach((cloud, index) => {
            const speed = isZooming ? 0.3 + index * 0.01 : 0.001 + index * 0.001;
            cloud.position.z += speed;
            if (!isZooming && cloud.position.z > 10) {
                cloud.position.set(Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * -50);
            }
        });
    });

    // Create clouds using useMemo for performance optimization
    const clouds = useMemo(() => {
        const cloudsArray = new Array(40).fill(null).map((_, index) => {
            const scale = index < 10 ? Math.random() * 25 + 25 : Math.random() * 10 + 15;
            const opacity = index < 10 ? 0.5 : 0.9;
            return (
                <mesh
                    ref={(ref) => (cloudRefs.current[index] = ref)}
                    key={index}
                    position={[Math.random() * 60 - 30, Math.random() * 30 - 15, Math.random() * -70]}
                    scale={[scale, scale, 1]}
                    rotation={[0, 0, Math.random() * Math.PI]}
                >
                    <planeGeometry />
                    <meshStandardMaterial map={cloudTexture} transparent opacity={opacity} color={0xFFFFFF} />
                </mesh>
            );
        });
        return cloudsArray;
    }, []);

    return <>{clouds}</>;
}

export default function SkyDivingCanvas({ isZooming, showCanvas }) {
    return showCanvas ? (
        <div className="w-screen h-screen absolute top-0 left-0 z-2">
            <Canvas className="w-full h-full" antialias>
                <fog attach="fog" args={[0xE0F7FF, 10, 60]} />
                <ambientLight />
                <MovingClouds isZooming={isZooming} />
            </Canvas>

        </div>
    ) : null;
}