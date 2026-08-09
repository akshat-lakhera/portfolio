import React from 'react';
import { Rocket } from './Rocket';
import { BlackHole } from './BlackHole';
import { ShaderGalaxy } from './ShaderGalaxy';
import { TexturedPlanet } from './TexturedPlanet';
import { AsteroidField } from './AsteroidField';
import { WarpEffect } from './WarpEffect';
import { LaunchPad } from './LaunchPad';

export type SystemState = 'LAUNCH_PAD' | 'UNIVERSE_MAP' | 'PROJECTS_GALAXY' | 'SKILLS_GALAXY' | 'EXPERIENCE_GALAXY';

interface RocketSceneProps {
  systemState: SystemState;
  isLaunching: boolean;
  activeWarp: boolean;
  onWarpToSystem: (target: SystemState) => void;
  onHubEnter: (hubId: string) => void;
  onHubLeave: () => void;
}

export const RocketScene: React.FC<RocketSceneProps> = ({
  systemState,
  isLaunching,
  activeWarp,
  onWarpToSystem,
  onHubEnter,
  onHubLeave,
}) => {
  return (
    <>
      {systemState !== 'LAUNCH_PAD' && <AsteroidField />}
      <WarpEffect active={activeWarp} />
      
      <Rocket systemState={systemState} isLaunching={isLaunching} />

      {/* LAUNCH PAD LEVEL */}
      {systemState === 'LAUNCH_PAD' && (
        <LaunchPad isLaunching={isLaunching} />
      )}

      {/* UNIVERSE LEVEL: Central Black Hole + 3 Orbiting Bruno Simon GLSL Shader Galaxies */}
      {systemState === 'UNIVERSE_MAP' && (
        <>
          <BlackHole 
            onEnterHorizon={() => onHubEnter('bio_horizon')}
            onLeaveHorizon={onHubLeave}
          />

          <ShaderGalaxy 
            id="projects_galaxy"
            position={[0, 0, -220]}
            color="#f5b942"
            name="Projects Galaxy"
            onWarpTrigger={() => onWarpToSystem('PROJECTS_GALAXY')}
          />

          <ShaderGalaxy 
            id="skills_galaxy"
            position={[220, 0, 120]}
            color="#3b82f6"
            name="Skills Galaxy"
            onWarpTrigger={() => onWarpToSystem('SKILLS_GALAXY')}
          />

          <ShaderGalaxy 
            id="experience_galaxy"
            position={[-220, 0, 120]}
            color="#10b981"
            name="Experience Galaxy"
            onWarpTrigger={() => onWarpToSystem('EXPERIENCE_GALAXY')}
          />
        </>
      )}

      {/* PROJECTS SYSTEM: 5 Real Textured Planets */}
      {systemState === 'PROJECTS_GALAXY' && (
        <>
          <TexturedPlanet 
            id="deepfake"
            position={[0, 0, -60]}
            colorHex={0xf43f5e}
            texturePath="/textures/mars.jpg"
            name="DEEPFAKE Detector"
            onEnter={() => onHubEnter('proj_deepfake')}
            onLeave={onHubLeave}
          />

          <TexturedPlanet 
            id="returnguard"
            position={[70, 0, 30]}
            colorHex={0xf5b942}
            texturePath="/textures/earth.jpg"
            name="ReturnGuard AI"
            onEnter={() => onHubEnter('proj_returnguard')}
            onLeave={onHubLeave}
          />

          <TexturedPlanet 
            id="cipd"
            position={[-70, 0, 30]}
            colorHex={0x3b82f6}
            texturePath="/textures/earth.jpg"
            name="CIPD 360 ERP"
            onEnter={() => onHubEnter('proj_cipd')}
            onLeave={onHubLeave}
          />

          <TexturedPlanet 
            id="shell"
            position={[0, 0, 100]}
            colorHex={0x10b981}
            texturePath="/textures/moon.jpg"
            name="Unix Shell & MLFQ"
            onEnter={() => onHubEnter('proj_shell')}
            onLeave={onHubLeave}
          />

          <TexturedPlanet 
            id="studyplanner"
            position={[0, 0, -150]}
            colorHex={0x8b5cf6}
            texturePath="/textures/mars.jpg"
            name="Study Planner"
            onEnter={() => onHubEnter('proj_studyplanner')}
            onLeave={onHubLeave}
          />
        </>
      )}

      {/* SKILLS SYSTEM */}
      {systemState === 'SKILLS_GALAXY' && (
        <>
          <TexturedPlanet 
            id="languages"
            position={[0, 0, -60]}
            colorHex={0x3b82f6}
            texturePath="/textures/earth.jpg"
            name="Languages"
            onEnter={() => onHubEnter('skill_languages')}
            onLeave={onHubLeave}
          />
          <TexturedPlanet 
            id="technologies"
            position={[70, 0, 40]}
            colorHex={0x8b5cf6}
            texturePath="/textures/mars.jpg"
            name="Technologies"
            onEnter={() => onHubEnter('skill_tech')}
            onLeave={onHubLeave}
          />
          <TexturedPlanet 
            id="foundations"
            position={[-70, 0, 40]}
            colorHex={0x10b981}
            texturePath="/textures/moon.jpg"
            name="CS Foundations"
            onEnter={() => onHubEnter('skill_cs')}
            onLeave={onHubLeave}
          />
        </>
      )}

      {/* EXPERIENCE SYSTEM */}
      {systemState === 'EXPERIENCE_GALAXY' && (
        <>
          <TexturedPlanet 
            id="drdo"
            position={[0, 0, -60]}
            colorHex={0x10b981}
            texturePath="/textures/earth.jpg"
            name="DRDO ISSA Lab"
            onEnter={() => onHubEnter('exp_drdo')}
            onLeave={onHubLeave}
          />
          <TexturedPlanet 
            id="grove"
            position={[70, 0, 40]}
            colorHex={0xf5b942}
            texturePath="/textures/mars.jpg"
            name="Grove Growth"
            onEnter={() => onHubEnter('exp_grove')}
            onLeave={onHubLeave}
          />
          <TexturedPlanet 
            id="codeforces"
            position={[-70, 0, 40]}
            colorHex={0xef4444}
            texturePath="/textures/moon.jpg"
            name="Codeforces & IMC"
            onEnter={() => onHubEnter('exp_codeforces')}
            onLeave={onHubLeave}
          />
        </>
      )}
    </>
  );
};
