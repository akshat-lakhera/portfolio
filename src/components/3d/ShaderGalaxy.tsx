import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface ShaderGalaxyProps {
  id: string;
  position: [number, number, number];
  color: string;
  name: string;
  onWarpTrigger: () => void;
}

const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform float uSpeed;
  attribute float aScale;
  attribute vec3 aRandomness;
  varying vec2 vUv;
  varying vec3 vColor;

  void main () {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      // spin
      float angle = atan(modelPosition.x, modelPosition.z);
      float distanceToCenter = length(modelPosition.xz);
      float angleOffset = (1.0 / (distanceToCenter + 0.1)) * uTime * uSpeed;
      angle += angleOffset;
      modelPosition.x = cos(angle) * distanceToCenter;
      modelPosition.z = sin(angle) * distanceToCenter;

      modelPosition.xyz += aRandomness;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;

      gl_Position = projectionPosition;

      gl_PointSize = uSize * aScale;
      gl_PointSize *= (1.0 / -viewPosition.z);
      vUv = uv;
      vColor = color;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vColor;

  void main () {
      float strength = 0.15 / (distance(vec2(gl_PointCoord.x, (gl_PointCoord.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
      strength *= 0.15 / (distance(vec2(gl_PointCoord.y, (gl_PointCoord.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

      vec3 color = mix(vec3(0.0), vColor, strength);
      gl_FragColor = vec4(color, strength);
  }
`;

export const ShaderGalaxy: React.FC<ShaderGalaxyProps> = ({
  position,
  color,
  name,
  onWarpTrigger,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hasWarped, setHasWarped] = React.useState(false);
  const count = 7000;
  const WARP_HORIZON = 15;

  const { geometry, uniforms } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);

    const arms = 4;
    const radius = 45;
    const insideColor = new THREE.Color(color);
    const outsideColor = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 3) * radius;
      const branchAngle = ((i % arms) * 2 * Math.PI) / arms;

      positions[i * 3] = Math.cos(branchAngle) * r;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(branchAngle) * r;

      randomness[i * 3] = (Math.random() - 0.5) * 3;
      randomness[i * 3 + 1] = (Math.random() - 0.5) * 3;
      randomness[i * 3 + 2] = (Math.random() - 0.5) * 3;

      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, r / radius);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2 + 0.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

    const uni = {
      uTime: { value: 0 },
      uSize: { value: 25.0 },
      uSpeed: { value: 0.5 },
    };

    return { geometry: geo, uniforms: uni };
  }, [count, color]);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.05);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += clampedDelta;
    }

    if (pointsRef.current) {
      const galaxyPos = new THREE.Vector3(...position);
      const camPos = new THREE.Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z);
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
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
          transparent
        />
      </points>

      {/* Galaxy Core */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[WARP_HORIZON - 0.5, WARP_HORIZON, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={2} />
      </mesh>

      {/* Sleek Futuristic Holographic HUD Badge */}
      <Html position={[0, 16, 0]} center zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center pointer-events-none">
          <div className="bg-[#09080d]/80 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-xl shadow-2xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }}></span>
            <span className="font-display text-sm tracking-[0.25em] text-white uppercase font-bold">
              {name}
            </span>
          </div>
          <span className="text-[9px] font-display text-white/50 tracking-[0.3em] uppercase mt-2 bg-black/60 px-3 py-1 rounded-full border border-white/10">
            ENTER ORBIT TO TELEPORT
          </span>
        </div>
      </Html>
    </group>
  );
};
