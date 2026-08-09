import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Environment, Stars, Loader } from '@react-three/drei';
import { RocketScene } from './components/3d/RocketScene';
import type { SystemState } from './components/3d/RocketScene';
import { UIManager } from './components/ui/UIManager';
import { LaunchIntroUI } from './components/ui/LaunchIntroUI';

export default function App() {
  const [systemState, setSystemState] = useState<SystemState>('LAUNCH_PAD');
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [activeWarp, setActiveWarp] = useState(false);

  const handleEnterSpace = () => {
    setActiveWarp(true);
    setTimeout(() => {
      setSystemState('UNIVERSE_MAP');
      setActiveWarp(false);
    }, 800);
  };

  const handleWarpToSystem = (targetSystem: SystemState) => {
    if (activeWarp) return;
    setActiveWarp(true);
    
    setTimeout(() => {
      setSystemState(targetSystem);
      setActiveWarp(false);
    }, 900);
  };

  const handleReturnToUniverse = () => {
    if (activeWarp) return;
    setActiveWarp(true);
    setTimeout(() => {
      setSystemState('UNIVERSE_MAP');
      setActiveHub(null);
      setActiveWarp(false);
    }, 900);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#030303]">
      {systemState === 'LAUNCH_PAD' ? (
        <LaunchIntroUI onEnterSpace={handleEnterSpace} />
      ) : (
        <>
          <div className="canvas-container">
            <Canvas shadows camera={{ position: [0, 4, 25], fov: 45 }} gl={{ antialias: true }}>
              <color attach="background" args={['#010101']} />
              <ambientLight intensity={0.4} />
              <directionalLight castShadow position={[100, 50, -50]} intensity={1.5} color="#ffffff" />
              
              <Stars radius={200} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
              
              <Suspense fallback={null}>
                <Physics broadphase="SAP" gravity={[0, 0, 0]}>
                  <RocketScene 
                    systemState={systemState}
                    isLaunching={false}
                    activeWarp={activeWarp}
                    onWarpToSystem={handleWarpToSystem}
                    onHubEnter={setActiveHub} 
                    onHubLeave={() => setActiveHub(null)} 
                  />
                </Physics>

                <Environment preset="night" />
              </Suspense>
            </Canvas>
          </div>

          <div className="ui-container">
            <UIManager 
              systemState={systemState}
              activeHub={activeHub}
              onReturnToUniverse={handleReturnToUniverse}
            />
          </div>
        </>
      )}

      <Loader 
        containerStyles={{ background: '#030303' }}
        innerStyles={{ width: '300px', height: '2px', background: 'rgba(255,255,255,0.1)' }}
        barStyles={{ background: '#c9962a' }}
        dataStyles={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#c9962a' }}
      />
    </div>
  );
}
