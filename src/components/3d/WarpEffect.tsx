import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 600;
const XY_BOUNDS = 100;
const Z_BOUNDS = 100;
const MAX_SCALE_FACTOR = 40;

interface WarpEffectProps {
  active: boolean;
}

export const WarpEffect: React.FC<WarpEffectProps> = ({ active }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!meshRef.current) return;
    const t = new THREE.Object3D();
    let j = 0;
    for (let i = 0; i < COUNT * 3; i += 3) {
      t.position.x = (Math.random() - 0.5) * XY_BOUNDS;
      t.position.y = (Math.random() - 0.5) * XY_BOUNDS;
      t.position.z = (Math.random() - 0.5) * Z_BOUNDS;
      t.updateMatrix();
      meshRef.current.setMatrixAt(j++, t.matrix);
    }
  }, []);

  const temp = new THREE.Matrix4();
  const tempPos = new THREE.Vector3();
  const tempObject = new THREE.Object3D();

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Animate warp progress
    if (active) {
      progressRef.current = THREE.MathUtils.lerp(progressRef.current, 1, delta * 4);
    } else {
      progressRef.current = THREE.MathUtils.lerp(progressRef.current, 0, delta * 4);
    }

    const warpSpeed = progressRef.current * MAX_SCALE_FACTOR;

    for (let i = 0; i < COUNT; i++) {
      meshRef.current.getMatrixAt(i, temp);

      // Stretch stars into hyperdrive streaks when active
      tempObject.scale.set(1, 1, Math.max(1, warpSpeed));

      tempPos.setFromMatrixPosition(temp);
      if (tempPos.z > Z_BOUNDS / 2) {
        tempPos.z = -Z_BOUNDS / 2;
      } else {
        tempPos.z += Math.max(delta * 20, warpSpeed * delta * 50);
      }
      tempObject.position.set(tempPos.x, tempPos.y, tempPos.z);

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} matrixAutoUpdate>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={active ? 0.9 : 0.2} />
    </instancedMesh>
  );
};
