import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Group, Object3D } from 'three';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';

const lerp = (value1: number, value2: number, amount: number) => {
  return value1 + (value2 - value1) * amount;
};

interface RocketProps {
  systemState?: string;
  isLaunching?: boolean;
}

export const Rocket: React.FC<RocketProps> = ({ systemState, isLaunching }) => {
  const group = useRef<Group>(null);
  const shipMesh = useRef<Group>(null);
  const controls = useKeyboardControls();
  
  // Physics state
  const velocity = useRef(new Vector3(0, 0, 0));
  // Neutral spawn vantage point: [0, 15, 120] facing the cosmos!
  const position = useRef(new Vector3(0, 15, 120));
  const rotation = useRef(new Vector3(0, 0, 0));

  // Reset ship position safely when warping to a new solar system
  useEffect(() => {
    if (systemState === 'UNIVERSE_MAP') {
      position.current.set(0, 15, 120);
    } else {
      position.current.set(0, 5, 40);
    }
    velocity.current.set(0, 0, 0);
    rotation.current.set(0, 0, 0);
    if (group.current) {
      group.current.position.copy(position.current);
      group.current.rotation.set(0, 0, 0);
    }
  }, [systemState]);

  // Engine exhaust particles
  const particleCount = 120;
  const particles = useMemo(() => new Array(particleCount).fill(0).map(() => ({
    position: new Vector3(),
    life: 0,
    speed: Math.random() * 0.2 + 0.1
  })), []);
  const particleMesh = useRef<any>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state, delta) => {
    // CRITICAL BUG FIX: Clamp delta to 0.05s max so tab switching NEVER causes position explosion or NaN crashes!
    const clampedDelta = Math.min(delta, 0.05);

    if (systemState === 'LAUNCH_PAD') {
      if (isLaunching) {
        position.current.y += clampedDelta * 60;
      } else {
        position.current.set(0, 1, 0);
      }

      if (group.current) {
        group.current.position.copy(position.current);
        group.current.rotation.set(0, 0, 0);
      }

      state.camera.position.set(0, position.current.y * 0.4 + 4, position.current.y * 0.3 + 25);
      state.camera.lookAt(0, position.current.y + 2, 0);
      return;
    }

    // Space Flight Controls
    const { forward, backward, left, right, up, down } = controls.current;
    
    const speed = forward ? 75 : backward ? -25 : 0;
    const turnSpeed = left ? 1.8 : right ? -1.8 : 0;
    const verticalSpeed = up ? 35 : down ? -35 : 0;
    
    rotation.current.y += turnSpeed * clampedDelta;
    
    const dir = new Vector3(0, 0, -1).applyAxisAngle(new Vector3(0, 1, 0), rotation.current.y);
    const targetVelocity = dir.multiplyScalar(speed);
    targetVelocity.y = verticalSpeed;

    velocity.current.lerp(targetVelocity, 3 * clampedDelta);
    position.current.addScaledVector(velocity.current, clampedDelta);

    if (group.current && shipMesh.current) {
      group.current.position.copy(position.current);
      group.current.rotation.y = rotation.current.y;
      
      const targetRoll = (turnSpeed / 1.8) * (Math.PI / 3);
      const targetPitch = (speed / 75) * -(Math.PI / 12) + (verticalSpeed / 35) * (Math.PI / 8);
      
      shipMesh.current.rotation.z = lerp(shipMesh.current.rotation.z, targetRoll, 6 * clampedDelta);
      shipMesh.current.rotation.x = lerp(shipMesh.current.rotation.x, targetPitch, 6 * clampedDelta);
    }

    // 3rd Person Follow Camera
    if (group.current) {
      const cameraOffset = new Vector3(0, 10, 30);
      cameraOffset.applyAxisAngle(new Vector3(0, 1, 0), rotation.current.y);
      const targetCameraPos = position.current.clone().add(cameraOffset);
      
      state.camera.position.lerp(targetCameraPos, 6 * clampedDelta);
      
      const lookAtOffset = new Vector3(0, 0, -25).applyAxisAngle(new Vector3(0, 1, 0), rotation.current.y);
      const targetLookAt = position.current.clone().add(lookAtOffset);
      
      state.camera.lookAt(targetLookAt);
    }

    // Engine Exhaust Particles
    if (particleMesh.current) {
      particles.forEach((p, i) => {
        p.life -= clampedDelta * 2;
        if (p.life <= 0) {
          p.life = 1;
          const nozzleOffset = new Vector3(Math.random() > 0.5 ? 0.8 : -0.8, 0, 2.5);
          nozzleOffset.applyAxisAngle(new Vector3(0, 1, 0), rotation.current.y);
          p.position.copy(position.current).add(nozzleOffset);
        } else {
          const backwards = new Vector3(0, 0, 1).applyAxisAngle(new Vector3(0, 1, 0), rotation.current.y);
          p.position.addScaledVector(backwards, p.speed);
        }
        
        dummy.position.copy(p.position);
        const scale = p.life * 0.5;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        particleMesh.current.setMatrixAt(i, dummy.matrix);
      });
      particleMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <group ref={group}>
        <group ref={shipMesh}>
          {/* Rocket Model */}
          <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[1, 4, 32, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Cockpit */}
          <mesh position={[0, 0.8, -1]} rotation={[Math.PI / 2.2, 0, 0]}>
            <capsuleGeometry args={[0.7, 1.5, 16, 16]} />
            <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.0} transmission={1} thickness={0.5} />
          </mesh>

          {/* Wings */}
          <mesh position={[1.5, -0.2, 1]} rotation={[0, -Math.PI / 6, 0]}>
            <boxGeometry args={[3, 0.2, 2]} />
            <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[-1.5, -0.2, 1]} rotation={[0, Math.PI / 6, 0]}>
            <boxGeometry args={[3, 0.2, 2]} />
            <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.4} />
          </mesh>

          {/* Thrusters */}
          <mesh position={[0.8, 0, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.6, 1, 16]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.8, 0, 2.6]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#00ffff" roughness={0.3} metalness={0.8} />
          </mesh>

          <mesh position={[-0.8, 0, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.6, 1, 16]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-0.8, 0, 2.6]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#00ffff" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Engine Exhaust */}
      <instancedMesh ref={particleMesh} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.6} blending={2} />
      </instancedMesh>
    </>
  );
};
