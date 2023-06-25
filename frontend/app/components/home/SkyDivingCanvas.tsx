
"use client";
import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect, useContext, memo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';

const SkyDivingCanvas = ({ isZooming }) => {
    
    function MovingClouds({ isZooming }) {
        const cloudTexture = useLoader(THREE.TextureLoader, '/image/cloud1.png');
        const cloudRefs = useRef([]);

        useFrame(() => {
            // Move clouds forward in every frame
            cloudRefs.current.forEach((cloud, index) => {
                const speed = isZooming ? 0.3 : 0.01 ;
                cloud.position.z += speed;
                if (!isZooming && cloud.position.z > 5) {
                    cloud.position.set(Math.random() * 60 - 30, Math.random() * 30 - 15, (Math.random() * -70) -70);
                }
            });
        });

        // Create clouds using useMemo for performance optimization
        const clouds = useMemo(() => {
            const cloudsArray = new Array(15).fill(null).map((_, index) => {
                const scale = Math.random() * 40 + 10;
                const opacity = Math.random()-0.1;
                return (
                    <mesh
                        ref={(ref) => (cloudRefs.current[index] = ref)}
                        key={index}
                        position={[Math.random() * 60 - 30, Math.random() * 30 - 15, (Math.random() * -50) -10]}
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


    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-2">
            <Canvas className="w-full h-full">
                <fog attach="fog" args={[0xE0F7FF, 10, 60]} />
                <ambientLight />
                <MovingClouds isZooming={isZooming} />
            </Canvas>

        </div>
    )
}

export default memo(SkyDivingCanvas);
