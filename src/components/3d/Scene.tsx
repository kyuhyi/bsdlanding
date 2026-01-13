"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";
import { Crystal } from "./Crystal";
import { Debris } from "./Debris";
import { Starfield } from "./Starfield";

export function InteractiveScene() {
  const scrollRef = useRef(0);
  const crystalRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      // Approximate max scroll for hero effect context
      const maxScroll = window.innerHeight * 1.5;
      scrollRef.current = Math.min(window.scrollY / maxScroll, 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    // Parallax - Mouse influence on camera
    const { x, y } = state.pointer;
    // Base position is (0,0,8), lerp offset
    const targetX = x * 0.5;
    const targetY = y * 0.5;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);

    // Scroll effect on Crystal
    if (crystalRef.current) {
        // Retreat backward: z decreases
        const zOffset = -scrollRef.current * 5; 
        // We use lerp for smooth retreat
        crystalRef.current.position.z = THREE.MathUtils.lerp(crystalRef.current.position.z, zOffset, 0.1);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <Environment preset="city" />
      <ambientLight intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, 10, 10]} intensity={2} color="#a78bfa" />
      
      {/* Starfield Background */}
      <Starfield />
      
      <group ref={crystalRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Crystal scale={1.8} />
        </Float>
      </group>
      
      <Debris scrollProgress={scrollRef} />
    </>
  );
}

