'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { UberNoise } from 'uber-noise';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BOUNDS = {
  width: 50,
  depth: 50,
  ceiling: 30,
  floor: -20,
} as const;

const DRIFT_SPEED = 0.2;
const NOISE_OFFSET_SCALE = 0.00001;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Distribute a single particle within the bounding volume. */
function scatterParticle(
  coords: Float32Array,
  tints: Float32Array,
  radii: Float32Array,
  idx: number,
) {
  const base = idx * 3;

  // Position – x/z uniform, y cubic-falloff for denser centre band
  coords[base] = Math.random() * BOUNDS.width - BOUNDS.width / 2;
  coords[base + 1] =
    Math.pow(Math.random(), 3) * BOUNDS.ceiling * (Math.random() < 0.5 ? 1 : -1);
  coords[base + 2] = Math.random() * BOUNDS.depth - BOUNDS.depth / 2;

  // Colour – occasionally dimmed channel for slight tint variation
  tints[base] = Math.random() < 0.2 ? 0.3 : 1.0;
  tints[base + 1] = Math.random() < 0.2 ? 0.3 : 1.0;
  tints[base + 2] = Math.random() < 0.2 ? 0.3 : 1.0;

  // Size – larger when closer (higher z), smaller when far away
  const zNorm = (coords[base + 2] + BOUNDS.depth / 2) / BOUNDS.depth; // 0..1
  radii[idx] = 0.04 + zNorm * 0.12; // parallax-ish size range
}

/** Check whether a particle has left the bounding box. */
function isOutOfBounds(x: number, y: number, z: number): boolean {
  return (
    y > BOUNDS.ceiling ||
    y < BOUNDS.floor ||
    Math.abs(x) > BOUNDS.width / 2 ||
    Math.abs(z) > BOUNDS.depth / 2
  );
}

// ---------------------------------------------------------------------------
// Circular particle texture (replaces default square)
// ---------------------------------------------------------------------------

function createDotTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.15)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface StarFieldProps {
  /** Total number of particles rendered. */
  particleCount?: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StarField({ particleCount = 3000 }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const noiseRef = useRef(new UberNoise({ scale: 0.3 }));
  const elapsedRef = useRef(0);
  const dotTexture = useMemo(() => createDotTexture(), []);

  // Allocate typed arrays once and populate initial positions / colours / sizes
  const { coords, tints, radii } = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    const tints = new Float32Array(particleCount * 3);
    const radii = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      scatterParticle(coords, tints, radii, i);
    }

    return { coords, tints, radii };
  }, [particleCount]);

  // Per-frame animation
  useFrame((_state, delta) => {
    const noise = noiseRef.current;
    const clamped = Math.min(delta, 0.1); // guard against tab-switch spikes
    elapsedRef.current += clamped;

    const hueShift = Math.sin(elapsedRef.current * 0.15) * 0.08; // subtle colour drift

    for (let i = 0; i < particleCount; i++) {
      const base = i * 3;
      const px = coords[base];
      const py = coords[base + 1];
      const pz = coords[base + 2];

      // Sample noise field for velocity in each axis
      const vx = noise.get(px + i * NOISE_OFFSET_SCALE, py, pz);
      const vy = noise.get(py, pz + i * NOISE_OFFSET_SCALE, px);
      const vz = noise.get(pz, px, py + i * NOISE_OFFSET_SCALE);

      coords[base] += vx * clamped * DRIFT_SPEED;
      coords[base + 1] += vy * clamped * DRIFT_SPEED;
      coords[base + 2] += vz * clamped * DRIFT_SPEED;

      // Subtle time-based colour shifting
      tints[base] = Math.max(0, Math.min(1, tints[base] + hueShift * 0.01));
      tints[base + 2] = Math.max(0, Math.min(1, tints[base + 2] - hueShift * 0.01));

      // Recalculate size based on updated z for parallax effect
      const zNorm = (coords[base + 2] + BOUNDS.depth / 2) / BOUNDS.depth;
      radii[i] = 0.04 + Math.max(0, Math.min(1, zNorm)) * 0.12;

      if (isOutOfBounds(coords[base], coords[base + 1], coords[base + 2])) {
        scatterParticle(coords, tints, radii, i);
      }
    }

    // Advance noise field over time so the flow pattern evolves
    noise.move(0, clamped, 0);

    // Flag buffer attributes for GPU upload
    const geometry = pointsRef.current?.geometry;
    if (geometry) {
      const posAttr = geometry.getAttribute('position');
      const colAttr = geometry.getAttribute('color');
      const sizeAttr = geometry.getAttribute('size');
      if (posAttr) (posAttr as THREE.BufferAttribute).needsUpdate = true;
      if (colAttr) (colAttr as THREE.BufferAttribute).needsUpdate = true;
      if (sizeAttr) (sizeAttr as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[coords, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[tints, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[radii, 1]}
          count={particleCount}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        map={dotTexture}
        size={0.2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
