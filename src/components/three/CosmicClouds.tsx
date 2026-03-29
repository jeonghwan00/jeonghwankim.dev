'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';

// Teal / cyan / emerald palette matching the portfolio
const CLOUD_PALETTE = ['#64ffda', '#2dd4bf', '#22d3ee', '#0ea5e9', '#34d399'];

interface CloudLayerData {
  position: [number, number, number];
  rotation: number;
  scale: number;
  color: string;
  rotationSpeed: number;
}

interface CosmicCloudsProps {
  /** Number of cloud sprites to render */
  count?: number;
  /** Base opacity for each cloud layer */
  opacity?: number;
  /** Spread range on x/y axes */
  spread?: [number, number];
  /** Depth offset on z axis */
  depthOffset?: number;
  /** Maximum scale multiplier */
  maxScale?: number;
}

/**
 * Generates a soft radial-gradient circle on an offscreen canvas,
 * returned as a THREE.CanvasTexture suitable for transparent sprites.
 */
function createCloudTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);

  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * A single animated cloud sprite that slowly rotates over time.
 */
function CloudSprite({ data, cloudTexture, opacity }: {
  data: CloudLayerData;
  cloudTexture: THREE.CanvasTexture;
  opacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += data.rotationSpeed * delta;
    }
  });

  return (
    <Billboard position={data.position}>
      <mesh ref={meshRef} rotation={[0, 0, data.rotation]} scale={data.scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={cloudTexture}
          color={data.color}
          transparent
          opacity={opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Billboard>
  );
}

/**
 * Renders softly glowing, slowly rotating billboard sprites
 * that create a cosmic cloud / nebula backdrop effect.
 */
export default function CosmicClouds({
  count = 15,
  opacity = 0.25,
  spread = [40, 20],
  depthOffset = -20,
  maxScale = 32,
}: CosmicCloudsProps) {
  const cloudTexture = useMemo(() => createCloudTexture(), []);

  const cloudLayers = useMemo<CloudLayerData[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        Math.random() * spread[0] - spread[0] / 2,
        Math.random() * spread[1] - spread[1] / 2,
        depthOffset + Math.random(),
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      scale: (Math.random() * 8 + 1) * (maxScale / 9),
      color: CLOUD_PALETTE[Math.floor(Math.random() * CLOUD_PALETTE.length)],
      // Very slow drift: between 0.01 and 0.04 rad/s, random direction
      rotationSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
    }));
  }, [count, spread, depthOffset, maxScale]);

  return (
    <group position={[0, 0, -5]} rotation={[0, 0, -0.3]}>
      {cloudLayers.map((layer, idx) => (
        <CloudSprite
          key={idx}
          data={layer}
          cloudTexture={cloudTexture}
          opacity={opacity}
        />
      ))}
    </group>
  );
}
