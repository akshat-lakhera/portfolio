import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, MathUtils } from 'three';

export const AsteroidField = () => {
  const count = 300;
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const asteroids = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const radius = MathUtils.randFloat(60, 500);
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const y = MathUtils.randFloatSpread(30);
      const z = Math.sin(angle) * radius;
      
      const rx = Math.random() * Math.PI;
      const ry = Math.random() * Math.PI;
      const rz = Math.random() * Math.PI;

      const scale = MathUtils.randFloat(0.3, 1.2);

      data.push({ x, y, z, rx, ry, rz, scale });
    }
    return data;
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      asteroids.forEach((asteroid, i) => {
        asteroid.rx += 0.001;
        asteroid.ry += 0.001;

        dummy.position.set(asteroid.x, asteroid.y, asteroid.z);
        dummy.rotation.set(asteroid.rx, asteroid.ry, asteroid.rz);
        dummy.scale.set(asteroid.scale, asteroid.scale, asteroid.scale);
        dummy.updateMatrix();
        
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#555555" 
        roughness={0.8} 
        metalness={0.2}
      />
    </instancedMesh>
  );
};
