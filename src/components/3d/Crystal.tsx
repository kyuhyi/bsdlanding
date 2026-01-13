"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function Crystal(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Idle animation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} {...props}>
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial 
        resolution={1024}
        distortion={0.25}
        color="#a78bfa"
        thickness={1}
        anisotropy={1}
        chromaticAberration={0.8}
        roughness={0.1}
        transmission={0.98}
        ior={1.5}
      />
    </mesh>
  );
}
