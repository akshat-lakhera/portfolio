import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, CanvasTexture } from 'three';
import { Html } from '@react-three/drei';

interface TexturedPlanetProps {
  id: string;
  position: [number, number, number];
  colorHex: number;
  texturePath?: string;
  name: string;
  onEnter: () => void;
  onLeave: () => void;
}

// Helper to generate a clean procedural planet surface texture without React Hook violations
function createPlanetSurfaceTexture(colorHex: number): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const hexStr = '#' + colorHex.toString(16).padStart(6, '0');
    ctx.fillStyle = hexStr;
    ctx.fillRect(0, 0, 512, 512);

    // Add surface marble details
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.18})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * 512,
        Math.random() * 512,
        Math.random() * 90 + 15,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.22})`;
      ctx.fillRect(
        0,
        Math.random() * 512,
        512,
        Math.random() * 35 + 5
      );
    }
  }

  return new CanvasTexture(canvas);
}

export const TexturedPlanet: React.FC<TexturedPlanetProps> = ({
  position,
  colorHex,
  name,
  onEnter,
  onLeave,
}) => {
  // Top-level hooks strictly declared in constant order (React Rules of Hooks)
  const meshRef = useRef<Mesh>(null);
  const [isActive, setIsActive] = useState(false);
  const TRIGGER_DISTANCE = 16;
  const hexStr = '#' + colorHex.toString(16).padStart(6, '0');

  // Procedural planet texture created via useMemo at top level
  const surfaceTexture = useMemo(() => createPlanetSurfaceTexture(colorHex), [colorHex]);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.05);

    if (meshRef.current) {
      meshRef.current.rotation.y += clampedDelta * 0.2;
      
      const planetPos = new Vector3(...position);
      const camPos = new Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z);
      const dist = planetPos.distanceTo(camPos);
      
      if (dist < TRIGGER_DISTANCE && !isActive) {
        setIsActive(true);
        onEnter();
      } else if (dist >= TRIGGER_DISTANCE && isActive) {
        setIsActive(false);
        onLeave();
      }
    }
  });

  return (
    <group position={position}>
      {/* Core Planet */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial 
          map={surfaceTexture}
          metalness={0.2}
          roughness={0.4}
          emissive={hexStr}
          emissiveIntensity={isActive ? 0.35 : 0.05}
        />
      </mesh>

      {/* Atmospheric Glow Shell */}
      <mesh scale={1.15}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial 
          color={hexStr} 
          transparent 
          opacity={isActive ? 0.35 : 0.15} 
          side={1}
        />
      </mesh>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[TRIGGER_DISTANCE - 0.4, TRIGGER_DISTANCE, 64]} />
        <meshBasicMaterial color={isActive ? hexStr : '#333333'} transparent opacity={0.6} side={2} />
      </mesh>

      {/* Sleek Holographic HUD Badge */}
      <Html position={[0, 13, 0]} center zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className={`bg-[#09080d]/80 backdrop-blur-xl border px-4 py-1.5 rounded-xl shadow-2xl flex items-center gap-2.5 transition-all duration-300 ${isActive ? 'border-white scale-110' : 'border-white/20 scale-100'}`}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hexStr }}></span>
            <span className="font-sans text-xs tracking-[0.2em] text-white uppercase font-bold">
              {name}
            </span>
          </div>
          {!isActive && (
            <span className="text-[8px] font-mono text-white/50 tracking-[0.25em] uppercase mt-1 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
              APPROACH TO INSPECT
            </span>
          )}
        </div>
      </Html>
    </group>
  );
};
