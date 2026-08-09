import * as THREE from 'three';

export type PlanetTextureType = 'gas' | 'ocean' | 'volcanic' | 'biolum' | 'cyber';

export function createProceduralPlanetTexture(baseColorHex: number, type: PlanetTextureType) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 1024;
  bumpCanvas.height = 512;
  const bumpCtx = bumpCanvas.getContext('2d');

  if (!ctx || !bumpCtx) return { map: null, bumpMap: null };

  const hexStr = '#' + baseColorHex.toString(16).padStart(6, '0');

  // Base background
  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, 1024, 512);

  bumpCtx.fillStyle = '#808080';
  bumpCtx.fillRect(0, 0, 1024, 512);

  if (type === 'gas') {
    // Gas giant horizontal bands
    for (let y = 0; y < 512; y += 4) {
      const alpha = Math.sin(y * 0.05) * 0.4 + 0.5;
      ctx.fillStyle = hexStr;
      ctx.globalAlpha = alpha * 0.6;
      ctx.fillRect(0, y, 1024, 6);
    }
  } else if (type === 'volcanic') {
    // Magma cracks
    ctx.strokeStyle = '#ff3300';
    ctx.lineWidth = 3;
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 1024, Math.random() * 512);
      ctx.lineTo(Math.random() * 1024, Math.random() * 512);
      ctx.stroke();
    }
  } else if (type === 'cyber') {
    // Anomaly circuits
    ctx.strokeStyle = hexStr;
    ctx.lineWidth = 2;
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      ctx.strokeRect(x, y, 40, 20);
    }
  } else if (type === 'ocean') {
    // Continent patches
    ctx.fillStyle = hexStr;
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 80 + 30, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Bioluminescent veins
    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 2;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 100, 0, Math.PI);
      ctx.stroke();
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;

  return { map, bumpMap };
}
