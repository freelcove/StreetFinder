
"use client";
import { TextureLoader, Mesh } from 'three';
import { useRef, useMemo  } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';


function MovingClouds({ isZooming }: { isZooming: boolean }) {
    const cloudTexture = useLoader(TextureLoader, '/image/cloud1.png');
    const cloudRefs = useRef<(Mesh | null)[]>([]);

    useFrame(() => {
        // Move clouds forward in every frame
        cloudRefs.current.forEach((cloud) => {
            const speed = isZooming ? 0.3 : 0.01 ;
            cloud!.position.z += speed;
            if (cloud!.position.z > 5) {
                cloud!.position.set(Math.random() * 60 - 30, Math.random() * 30 - 15, (Math.random() * -70) -70);
            }
        });
    });

    // Create clouds using useMemo for performance optimization
    const clouds = useMemo(() => {
        const cloudsArray = new Array(20).fill(null).map((_, index) => {
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
    }, [cloudTexture]);

    return <>{clouds}</>;
}

export default function SkyDivingCanvas({isZooming}: {isZooming: boolean}) {
   
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