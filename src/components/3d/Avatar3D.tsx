"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Cylinder, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PixarAvatar = () => {
  const groupRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Gentle breathing animation
      groupRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.02);
      // Subtle head movement
      groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.6) * 0.02;
    }
    
    // Eye blinking animation
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(time * 0.3) < -0.95 ? 0.3 : 1;
      eyeLeftRef.current.scale.y = blink;
      eyeRightRef.current.scale.y = blink;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head - oversized and cartoonish */}
      <Sphere args={[1.2, 32, 32]} position={[0, 2, 0]}>
        <meshToonMaterial 
          color="#D2B48C" 
          gradientMap={null}
        />
      </Sphere>
      
      {/* Large expressive eyes */}
      <Sphere args={[0.25, 32, 32]} position={[-0.35, 2.2, 0.8]} ref={eyeLeftRef}>
        <meshToonMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.25, 32, 32]} position={[0.35, 2.2, 0.8]} ref={eyeRightRef}>
        <meshToonMaterial color="#ffffff" />
      </Sphere>
      
      {/* Eye pupils - large and expressive */}
      <Sphere args={[0.12, 32, 32]} position={[-0.35, 2.2, 0.9]}>
        <meshToonMaterial color="#2F4F4F" />
      </Sphere>
      <Sphere args={[0.12, 32, 32]} position={[0.35, 2.2, 0.9]}>
        <meshToonMaterial color="#2F4F4F" />
      </Sphere>
      
      {/* Eye highlights for life */}
      <Sphere args={[0.04, 16, 16]} position={[-0.32, 2.25, 0.95]}>
        <meshToonMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.04, 16, 16]} position={[0.38, 2.25, 0.95]}>
        <meshToonMaterial color="#ffffff" />
      </Sphere>
      
      {/* Stylized glasses - modern tech look */}
      <group>
        {/* Left lens - rounded rectangle */}
        <RoundedBox args={[0.5, 0.4, 0.05]} position={[-0.35, 2.2, 0.95]} radius={0.1}>
          <meshPhysicalMaterial 
            color="#1a1a1a" 
            transparent 
            opacity={0.2}
            roughness={0.1}
            metalness={0.1}
          />
        </RoundedBox>
        {/* Right lens */}
        <RoundedBox args={[0.5, 0.4, 0.05]} position={[0.35, 2.2, 0.95]} radius={0.1}>
          <meshPhysicalMaterial 
            color="#1a1a1a" 
            transparent 
            opacity={0.2}
            roughness={0.1}
            metalness={0.1}
          />
        </RoundedBox>
        {/* Bridge */}
        <Cylinder args={[0.03, 0.03, 0.15, 16]} position={[0, 2.2, 0.9]} rotation={[0, 0, Math.PI / 2]}>
          <meshToonMaterial color="#2a2a2a" />
        </Cylinder>
        {/* Arms */}
        <Cylinder args={[0.025, 0.025, 0.6, 16]} position={[-0.7, 2.2, 0.7]} rotation={[0, 0.3, 0]}>
          <meshToonMaterial color="#2a2a2a" />
        </Cylinder>
        <Cylinder args={[0.025, 0.025, 0.6, 16]} position={[0.7, 2.2, 0.7]} rotation={[0, -0.3, 0]}>
          <meshToonMaterial color="#2a2a2a" />
        </Cylinder>
      </group>
      
      {/* Friendly smile */}
      <Sphere args={[0.3, 32, 32]} position={[0, 1.7, 0.9]} scale={[1, 0.4, 0.6]}>
        <meshToonMaterial color="#8B4513" />
      </Sphere>
      
      {/* Stylized nose */}
      <Sphere args={[0.08, 16, 16]} position={[0, 1.9, 1]}>
        <meshToonMaterial color="#CD853F" />
      </Sphere>
      
      {/* Modern hair - textured and stylish */}
      <Sphere args={[1.25, 32, 32]} position={[0, 2.4, -0.2]} scale={[1, 0.8, 0.9]}>
        <meshToonMaterial color="#654321" />
      </Sphere>
      {/* Hair details */}
      <Sphere args={[0.3, 16, 16]} position={[-0.6, 2.6, 0.3]}>
        <meshToonMaterial color="#5d3a1a" />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[0.7, 2.7, 0.2]}>
        <meshToonMaterial color="#5d3a1a" />
      </Sphere>
      
      {/* Neck */}
      <Cylinder args={[0.35, 0.4, 0.6, 32]} position={[0, 1, 0]}>
        <meshToonMaterial color="#D2B48C" />
      </Cylinder>
      
      {/* Modern tech shirt - space ranger inspired */}
      <RoundedBox args={[1.4, 1.6, 0.6]} position={[0, 0, 0]} radius={0.1}>
        <meshToonMaterial color="#4169E1" />
      </RoundedBox>
      
      {/* Shirt details - tech elements */}
      <RoundedBox args={[0.8, 0.3, 0.1]} position={[0, 0.3, 0.35]} radius={0.05}>
        <meshToonMaterial color="#00CED1" />
      </RoundedBox>
      <RoundedBox args={[0.6, 0.2, 0.1]} position={[0, -0.1, 0.35]} radius={0.05}>
        <meshToonMaterial color="#32CD32" />
      </RoundedBox>
      
      {/* Arms */}
      <Cylinder args={[0.2, 0.25, 1, 32]} position={[-0.9, 0.2, 0]} rotation={[0, 0, Math.PI / 8]}>
        <meshToonMaterial color="#D2B48C" />
      </Cylinder>
      <Cylinder args={[0.2, 0.25, 1, 32]} position={[0.9, 0.2, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <meshToonMaterial color="#D2B48C" />
      </Cylinder>
      
      {/* Hands */}
      <Sphere args={[0.18, 16, 16]} position={[-1.3, -0.3, 0]}>
        <meshToonMaterial color="#D2B48C" />
      </Sphere>
      <Sphere args={[0.18, 16, 16]} position={[1.3, -0.3, 0]}>
        <meshToonMaterial color="#D2B48C" />
      </Sphere>
      
      {/* Toy-like base/legs */}
      <RoundedBox args={[1.2, 1, 0.5]} position={[0, -1.2, 0]} radius={0.1}>
        <meshToonMaterial color="#4169E1" />
      </RoundedBox>
      
      {/* Floating tech elements around avatar */}
      <group>
        <RoundedBox args={[0.1, 0.1, 0.02]} position={[1.8, 1.5, 0.5]} rotation={[0, Math.PI / 4, 0]}>
          <meshToonMaterial color="#00FFFF" emissive="#003333" />
        </RoundedBox>
        <RoundedBox args={[0.08, 0.08, 0.02]} position={[-1.7, 2.2, 0.3]} rotation={[0, -Math.PI / 3, 0]}>
          <meshToonMaterial color="#FF6347" emissive="#330000" />
        </RoundedBox>
        <Sphere args={[0.05, 16, 16]} position={[1.5, 2.8, -0.2]}>
          <meshToonMaterial color="#32CD32" emissive="#003300" />
        </Sphere>
      </group>
    </group>
  );
};

const Avatar3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Pixar-style lighting setup */}
        <ambientLight intensity={0.4} color="#f0f8ff" />
        <directionalLight 
          position={[3, 4, 2]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-2, 3, 3]} intensity={0.6} color="#87ceeb" />
        <pointLight position={[2, 1, -2]} intensity={0.4} color="#ffd700" />
        
        {/* Rim lighting for that Pixar glow */}
        <directionalLight 
          position={[-3, 2, -2]} 
          intensity={0.5} 
          color="#ff69b4"
        />
        
        <PixarAvatar />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;