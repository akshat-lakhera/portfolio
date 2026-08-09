import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LaunchPadProps {
  isLaunching: boolean;
}

export const LaunchPad: React.FC<LaunchPadProps> = ({ isLaunching }) => {
  const smokeCount = 150;
  const smokeMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const smokeData = useMemo(() => {
    return new Array(smokeCount).fill(0).map(() => ({
      x: (Math.random() - 0.5) * 12,
      y: Math.random() * 3,
      z: (Math.random() - 0.5) * 12,
      scale: Math.random() * 2 + 1,
      speed: Math.random() * 0.05 + 0.02,
    }));
  }, [smokeCount]);

  useFrame((_, delta) => {
    if (smokeMesh.current) {
      smokeData.forEach((s, i) => {
        // When launching, smoke expands violently
        const currentSpeed = isLaunching ? s.speed * 4 : s.speed;
        s.y += currentSpeed;
        s.scale += delta * (isLaunching ? 2 : 0.5);

        if (s.y > (isLaunching ? 40 : 12)) {
          s.y = 0;
          s.scale = Math.random() * 2 + 1;
        }

        dummy.position.set(s.x, s.y, s.z);
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        smokeMesh.current!.setMatrixAt(i, dummy.matrix);
      });
      smokeMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Launch Pad Base */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[12, 14, 1, 32]} />
        <meshStandardMaterial color="#111115" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Glowing Launch Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6, 7, 32]} />
        <meshBasicMaterial color="#f5b942" transparent opacity={0.8} />
      </mesh>

      {/* Support Gantry Towers */}
      <mesh position={[-8, 8, 0]}>
        <boxGeometry args={[1.5, 16, 1.5]} />
        <meshStandardMaterial color="#222228" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[8, 8, 0]}>
        <boxGeometry args={[1.5, 16, 1.5]} />
        <meshStandardMaterial color="#222228" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Billowing Thruster Smoke Emitter */}
      <instancedMesh ref={smokeMesh} args={[undefined, undefined, smokeCount]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={isLaunching ? 0.4 : 0.2} />
      </instancedMesh>
    </group>
  );
};
