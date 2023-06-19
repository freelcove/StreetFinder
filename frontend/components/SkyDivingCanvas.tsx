"use client";

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import Link from 'next/link';

function Background() {
    const aerialTexture = useLoader(THREE.TextureLoader, '/image/aerialview1.jpg');
    aerialTexture.minFilter = THREE.LinearFilter;
    return (
      <mesh position={[0, 0, -40]} scale={[150, 140, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={aerialTexture} depthTest={false} />
      </mesh>
    );
  }

  
function ThickClouds() {
    // Load the cloud texture
    const cloudTexture = useLoader(THREE.TextureLoader, '/image/cloud1.png');
    const cloudRefs = useRef([]);

    useFrame(() => {
        // Move clouds forward in every frame
        cloudRefs.current.forEach((cloud) => {
            cloud.position.z += 0.005;
            // When cloud passes camera, reset position to the back
            if (cloud.position.z > 10) {
                cloud.position.set(Math.random() * 60 - 30, Math.random() * 30 - 15, -50);
            }
        });
    });

    // Create clouds using useMemo for performance optimization
    const clouds = useMemo(() => new Array(40).fill(null).map((_, index) => {
        // Random scale for each cloud
        const scale = Math.random() * 15 + 10;
        return (
            <mesh
                ref={(ref) => (cloudRefs.current[index] = ref)}
                key={index}
                // Random initial position for each cloud
                position={[Math.random() * 60 - 30, Math.random() * 30 - 15, Math.random() * -50]}
                // Set the scale for each cloud
                scale={[scale, scale, 1]}
                // Random rotation for natural look
                rotation={[0, 0, Math.random() * Math.PI]}
            >
                <planeGeometry />
                // Set cloud material, opacity and color
                <meshStandardMaterial map={cloudTexture} transparent opacity={0.5} color={0xa0b0c0} />
            </mesh>
        );
    }), []);

    return <>{clouds}</>;
}

function MovingClouds() {
    // Load the cloud texture
    const cloudTexture = useLoader(THREE.TextureLoader, '/image/cloud1.png');
    const cloudRefs = useRef([]);

    useFrame(() => {
        // Move clouds forward in every frame
        cloudRefs.current.forEach((cloud, index) => {
            cloud.position.z += 0.001 + index * 0.001;
            // When cloud passes camera, reset position to the back
            if (cloud.position.z > 10) {
                cloud.position.set(Math.random() * 20 - 10, Math.random() * 10 - 5, -30);
            }
        });
    });

    // Create clouds using useMemo for performance optimization
    const clouds = useMemo(() => new Array(20).fill(null).map((_, index) => {
        // Random scale for each cloud, minimum size is bigger
        const scale = Math.random() * 10 + 4;
        return (
            <mesh
                ref={(ref) => (cloudRefs.current[index] = ref)}
                key={index}
                // Random initial position for each cloud
                position={[Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * -30]}
                // Set the scale for each cloud
                scale={[scale, scale, 1]}
                // Random rotation for natural look
                rotation={[0, 0, Math.random() * Math.PI]}
            >
                <planeGeometry />
                // Set cloud material, opacity and color
                <meshStandardMaterial map={cloudTexture} transparent opacity={0.9} color={0xffffff} />
            </mesh>
        );
    }), []);

    return <>{clouds}</>;
}

export default function SkyDivingCanvas() {
    return (
        <div className="w-screen h-screen relative">
            <Canvas className="w-full h-full" antialias>
                <fog attach="fog" args={[0xE0F7FF, 10, 60]} />
                <ambientLight />
                <Background />
                <ThickClouds />
                <MovingClouds />
            </Canvas>
            <Link href="/">

            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-gray-800 hover:text-white transition-colors duration-600"
            >
                STREET FINDER
            </div>
            </Link>
        </div>
    );
}
