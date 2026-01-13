"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const CODE_SNIPPETS = [
  "React", "Next.js", "TypeScript", "JavaScript", "<div>", "{}", "[]", "=>", 
  "import", "export", "const", "let", "return", "try", "catch",
  "async", "await", "void", "Promise", "<>", "</>", "npm", "git",
  "useState", "useEffect", "props", "map()", "filter()", "API",
  "fetch()", "JSON", "CSS", "HTML", "Node.js", "Python", "AI",
  "GPT", "function", "class", "interface", "type", "module",
  "webpack", "vite", "tailwind", "prisma", "graphql", "REST"
];

export function Debris({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 60;

  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ),
      rot: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ),
      scale: 0.5 + Math.random() * 0.5,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      color: Math.random() > 0.5 ? "#3b82f6" : "#a78bfa" // Blue or Purple
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const s = scrollProgress.current;

    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      // Expand radius based on scroll
      const expansion = 1 + s * 4; 
      
      child.position.x = p.pos.x * expansion;
      child.position.y = p.pos.y * expansion;
      child.position.z = p.pos.z + (s * 8); 
      
      // Floating text usually faces camera, but we want chaotic 3D feel
      // We'll rotate them slowly
      child.rotation.x += delta * 0.2;
      child.rotation.y += delta * 0.2;
    });
    
    groupRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={p.pos}
          rotation={p.rot}
          scale={p.scale}
          color={p.color}
          fontSize={0.5}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" // Basic fallback
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {p.text}
        </Text>
      ))}
    </group>
  );
}
