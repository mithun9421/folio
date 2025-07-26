"use client";
import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
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

function SkillSphere({ skill, onClick }: { skill: SkillNode; onClick: (skill: SkillNode) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
      
      // Pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
    if (glowRef.current) {
      // Rotating glow ring
      glowRef.current.rotation.z += 0.02;
      const glowPulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      glowRef.current.scale.setScalar(glowPulse);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={skill.position}>
        {/* Outer glow ring */}
        <mesh 
          ref={glowRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick(skill)}
        >
          <torusGeometry args={[skill.size * 0.8, 0.05, 8, 32]} />
          <meshBasicMaterial 
            color={skill.color} 
            transparent 
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Main sphere with neon effect */}
        <mesh 
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick(skill)}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[skill.size * 0.4, 32, 16]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh scale={hovered ? 1.4 : 1.2}>
          <sphereGeometry args={[skill.size * 0.4, 32, 16]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={hovered ? 0.4 : 0.2}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Particle ring */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * skill.size * 0.9;
          const z = Math.sin(angle) * skill.size * 0.9;
          
          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial 
                color={skill.color} 
                transparent 
                opacity={0.8}
              />
            </mesh>
          );
        })}

        {/* Skill name with neon glow */}
        <Text
          ref={textRef}
          position={[0, skill.size * 0.9, 0]}
          fontSize={hovered ? 0.35 : 0.28}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor={skill.color}
          outlineOpacity={0.8}
        >
          {skill.name}
        </Text>

        {/* Floating particles around sphere */}
        {hovered && Array.from({ length: 6 }).map((_, i) => (
          <Float key={`particle-${i}`} speed={4} rotationIntensity={0.5} floatIntensity={2}>
            <mesh position={[
              (Math.random() - 0.5) * skill.size * 2,
              (Math.random() - 0.5) * skill.size * 2,
              (Math.random() - 0.5) * skill.size * 2
            ]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial 
                color={skill.color} 
                transparent 
                opacity={0.6}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
}

function ConnectionLines() {
  const lineRefs = useRef<THREE.Line[]>([]);
  
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
          lines.push([skill1.position, skill2.position, skill1.color]);
        }
      }
    }
    return lines;
  }, []);

  useFrame((state) => {
    lineRefs.current.forEach((line, index) => {
      if (line && line.material) {
        const material = line.material as THREE.LineBasicMaterial;
        // Animated opacity for flowing effect
        const opacity = (Math.sin(state.clock.elapsedTime * 2 + index * 0.5) + 1) * 0.2;
        material.opacity = opacity;
      }
    });
  });

  return (
    <>
      {connections.map((connection, index) => (
        <line 
          key={index}
          ref={(ref) => {
            if (ref) lineRefs.current[index] = ref;
          }}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                ...connection[0],
                ...connection[1],
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={connection[2]} 
            opacity={0.4} 
            transparent 
            linewidth={2}
          />
        </line>
      ))}
    </>
  );
}

export default function SkillsVisualization({ onSkillClick }: { onSkillClick?: (skill: SkillNode) => void }) {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  const handleSkillClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
    onSkillClick?.(skill);
  };

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-black via-purple-900/20 to-slate-900 rounded-lg overflow-hidden relative">
      {/* Neon border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 p-[2px]">
        <div className="w-full h-full bg-gradient-to-br from-black via-purple-900/20 to-slate-900 rounded-lg" />
      </div>
      
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Enhanced lighting for neon effect */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#60A5FA" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#A855F7" />
        <pointLight position={[0, 10, -10]} intensity={0.4} color="#06B6D4" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#8B5CF6"
          target-position={[0, 0, 0]}
        />
        
        {/* Fog for depth */}
        <fog attach="fog" args={["#000000", 8, 25]} />
        
        <ConnectionLines />
        
        {skillsData.map((skill, index) => (
          <SkillSphere 
            key={index} 
            skill={skill} 
            onClick={handleSkillClick}
          />
        ))}
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          maxDistance={15}
          minDistance={3}
          autoRotate={true}
          autoRotateSpeed={0.3}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
      
      {/* Enhanced info overlay */}
      <div className="absolute bottom-4 left-4 text-white/70 text-sm backdrop-blur-sm bg-black/20 p-3 rounded-lg border border-blue-500/20">
        <p className="font-semibold text-blue-400">Interactive 3D Skills Matrix</p>
        <p className="text-xs mt-1">Drag to rotate • Scroll to zoom • Click skills for details</p>
        {selectedSkill && (
          <p className="text-xs mt-2 text-cyan-400">
            Selected: <span className="font-semibold">{selectedSkill.name}</span>
          </p>
        )}
      </div>

      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: "0 0 10px currentColor",
            }}
          />
        ))}
      </div>
    </div>
  );
}