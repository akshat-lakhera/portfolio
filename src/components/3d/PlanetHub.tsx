import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Color, ShaderMaterial, AdditiveBlending, BackSide } from 'three';
import { Html } from '@react-three/drei';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaderAtmosphere = `
  uniform vec3 color;
  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vPositionNormal), 4.0);
    gl_FragColor = vec4(color, 1.0) * intensity;
  }
`;

interface PlanetHubProps {
  id: string;
  position: [number, number, number];
  color: string;
  name: string;
  onEnter: () => void;
  onLeave: () => void;
}

export const PlanetHub: React.FC<PlanetHubProps> = ({ position, color, name, onEnter, onLeave }) => {
  const meshRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const [isActive, setIsActive] = useState(false);
  const TRIGGER_DISTANCE = 22;

  const atmosphereMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShaderAtmosphere,
      uniforms: {
        color: { value: new Color(color) }
      },
      blending: AdditiveBlending,
      side: BackSide,
      transparent: true
    });
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      
      const planetPos = new Vector3(...position);
      const camPos = new Vector3(state.camera.position.x, 0, state.camera.position.z);
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
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          emissive={color}
          emissiveIntensity={isActive ? 0.6 : 0.2}
          wireframe={!isActive}
        />
      </mesh>

      <mesh ref={atmosphereRef} scale={1.2}>
        <sphereGeometry args={[8, 64, 64]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[TRIGGER_DISTANCE - 0.4, TRIGGER_DISTANCE, 128]} />
        <meshBasicMaterial color={isActive ? color : '#222222'} transparent opacity={isActive ? 0.8 : 0.3} side={2} />
      </mesh>

      <Html position={[0, 14, 0]} center zIndexRange={[100, 0]}>
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center ${isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
          <div className="font-display text-4xl tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: isActive ? '#fff' : color, textShadow: isActive ? `0 0 20px ${color}` : 'none' }}>
            {name}
          </div>
          {!isActive && (
            <div className="text-[9px] uppercase tracking-[0.4em] text-white/50 mt-4 border border-white/20 px-3 py-1 rounded-full animate-pulse bg-black/50 backdrop-blur-md">
              Enter Orbit
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
