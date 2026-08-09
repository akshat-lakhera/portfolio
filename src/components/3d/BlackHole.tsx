import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { Html } from '@react-three/drei';

interface BlackHoleProps {
  onEnterHorizon: () => void;
  onLeaveHorizon: () => void;
}

export const BlackHole: React.FC<BlackHoleProps> = ({ onEnterHorizon, onLeaveHorizon }) => {
  const diskRef = useRef<Mesh>(null);
  const [isActive, setIsActive] = useState(false);
  const EVENT_HORIZON = 25;

  useFrame((state) => {
    if (diskRef.current) {
      diskRef.current.rotation.z += 0.005;
      
      const blackHolePos = new Vector3(0, 0, 0);
      const camPos = new Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z);
      const dist = blackHolePos.distanceTo(camPos);
      
      if (dist < EVENT_HORIZON && !isActive) {
        setIsActive(true);
        onEnterHorizon();
      } else if (dist >= EVENT_HORIZON && isActive) {
        setIsActive(false);
        onLeaveHorizon();
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Event Horizon (Pure Pitch Black Sphere) */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[12, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Swirling Accretion Disk */}
      <mesh ref={diskRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[13, 35, 128]} />
        <meshBasicMaterial 
          color={isActive ? '#ff6600' : '#c9962a'} 
          transparent 
          opacity={0.8} 
          side={2} 
        />
      </mesh>

      {/* Sleek Holographic HUD Badge */}
      <Html position={[0, 22, 0]} center zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center pointer-events-none">
          <div className="bg-[#09080d]/80 backdrop-blur-xl border border-[#f5b942]/40 px-6 py-2.5 rounded-xl shadow-2xl flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5b942] animate-ping"></span>
            <span className="font-display text-base tracking-[0.3em] text-[#f5b942] uppercase font-bold">
              SUPERMASSIVE BLACK HOLE
            </span>
          </div>
          <span className="text-[9px] font-display text-white/60 tracking-[0.3em] uppercase mt-2 bg-black/60 px-4 py-1 rounded-full border border-white/10">
            APPROACH HORIZON FOR CORE ARCHIVE
          </span>
        </div>
      </Html>
    </group>
  );
};
