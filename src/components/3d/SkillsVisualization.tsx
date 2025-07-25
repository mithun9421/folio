"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SkillNode {
  name: string;
  position: [number, number, number];
  color: string;
  size: number;
  category: string;
}

const skillsData: SkillNode[] = [
  // Frontend
  { name: "React", position: [-3, 2, 0], color: "#61DAFB", size: 1.2, category: "frontend" },
  { name: "TypeScript", position: [-2, 0, 1], color: "#3178C6", size: 1.1, category: "frontend" },
  { name: "Tailwind", position: [-1, 1.5, -1], color: "#06B6D4", size: 0.9, category: "frontend" },
  { name: "HTML/CSS", position: [-2.5, -1, 0.5], color: "#E34F26", size: 0.8, category: "frontend" },
  
  // Backend
  { name: "Node.js", position: [2, 1, 0], color: "#339933", size: 1.1, category: "backend" },
  { name: "Java", position: [3, -0.5, 1], color: "#ED8B00", size: 1.0, category: "backend" },
  { name: "Express", position: [1.5, 2.5, -0.5], color: "#000000", size: 0.9, category: "backend" },
  { name: "REST API", position: [2.5, 0.5, 1.5], color: "#FF6B35", size: 0.8, category: "backend" },
  
  // Database
  { name: "MongoDB", position: [0, -2, 2], color: "#47A248", size: 1.0, category: "database" },
  { name: "PostgreSQL", position: [1, -1.5, -1.5], color: "#336791", size: 0.9, category: "database" },
  
  // Monitoring
  { name: "OpenTelemetry", position: [-1, -2.5, 1], color: "#0F1419", size: 1.1, category: "monitoring" },
  { name: "Datadog", position: [0, 0, -2], color: "#632CA6", size: 1.0, category: "monitoring" },
  
  // Privacy & Compliance
  { name: "GDPR", position: [-1.5, 1, 2], color: "#4285F4", size: 0.9, category: "privacy" },
  { name: "Privacy Eng", position: [0.5, -1, 2.5], color: "#9C27B0", size: 1.0, category: "privacy" },
  
  // DevOps
  { name: "Docker", position: [3, 1.5, -1], color: "#2496ED", size: 0.9, category: "devops" },
  { name: "GitHub Actions", position: [-3, 0, -1.5], color: "#2088FF", size: 0.8, category: "devops" },
];

function SkillSphere({ skill }: { skill: SkillNode }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <group position={skill.position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[skill.size * 0.5, 32, 16]} />
          <MeshDistortMaterial
            color={skill.color}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        <Text
          ref={textRef}
          position={[0, skill.size * 0.7, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
}

function ConnectionLines() {
  const connections = useMemo(() => {
    const lines = [];
    
    for (let i = 0; i < skillsData.length; i++) {
      for (let j = i + 1; j < skillsData.length; j++) {
        const skill1 = skillsData[i];
        const skill2 = skillsData[j];
        
        // Connect skills in same category or related categories
        if (skill1.category === skill2.category || 
            (skill1.category === "frontend" && skill2.category === "backend") ||
            (skill1.category === "backend" && skill2.category === "database") ||
            (skill1.category === "monitoring" && skill2.category === "privacy")) {
          lines.push([skill1.position, skill2.position]);
        }
      }
    }
    return lines;
  }, []);

  return (
    <>
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                ...connection[0],
                ...connection[1],
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#444444" opacity={0.3} transparent />
        </line>
      ))}
    </>
  );
}

export default function SkillsVisualization() {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-slate-900 to-black rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4F46E5" />
        
        <ConnectionLines />
        
        {skillsData.map((skill, index) => (
          <SkillSphere key={index} skill={skill} />
        ))}
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          maxDistance={15}
          minDistance={5}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white/70 text-sm">
        <p>Interactive 3D Skills Visualization</p>
        <p className="text-xs">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}