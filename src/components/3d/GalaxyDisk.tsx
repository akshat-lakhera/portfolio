import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, Vector3, Color } from 'three';
import { Html } from '@react-three/drei';

interface GalaxyDiskProps {
  id: string;
  position: [number, number, number];
  color: string;
  name: string;
  onWarpTrigger: () => void;
}

export const GalaxyDisk: React.FC<GalaxyDiskProps> = ({ _id: _unusedId, position, color, name, onWarpTrigger }: any) => {
  const pointsRef = useRef<Points>(null);
  const [hasWarped, setHasWarped] = useState(false);
  const WARP_HORIZON = 35;
  const count = 6000;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const arms = 4;
    const radius = 35;
    const insideColor = new Color(color);
    const outsideColor = new Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 3) * radius;
      const spinAngle = r * 0.4;
      const branchAngle = ((i % arms) * 2 * Math.PI) / arms;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r;

      const x = Math.cos(branchAngle + spinAngle) * r + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * r + randomZ;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, r / radius);

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return { positions: pos, colors: col };
  }, [count, color]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0015;

      const galaxyPos = new Vector3(...position);
      const camPos = new Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z);
      const dist = galaxyPos.distanceTo(camPos);

      if (dist < WARP_HORIZON && !hasWarped) {
        setHasWarped(true);
        onWarpTrigger();
      } else if (dist >= WARP_HORIZON + 15 && hasWarped) {
        setHasWarped(false);
      }
    }
  });

  return (
    <group position={position}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={2}
          vertexColors
          transparent
          opacity={0.8}
        />
      </points>

      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      <Html position={[0, 16, 0]} center zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center">
          <div className="font-display text-3xl tracking-[0.3em] uppercase whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" style={{ color }}>
            {name}
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-white/60 mt-2 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full animate-pulse">
            APPROACH HORIZON TO WARP
          </div>
        </div>
      </Html>
    </group>
  );
};
