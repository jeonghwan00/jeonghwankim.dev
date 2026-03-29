"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

const StarField = React.lazy(() => import("./StarField"));
const CosmicClouds = React.lazy(() => import("./CosmicClouds"));

export default function BackgroundScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
      return;
    }
    setMounted(true);
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        frameloop="always"
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#060e1a"]} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <StarField particleCount={3000} />
          <CosmicClouds count={10} opacity={0.08} spread={[50, 30]} depthOffset={-12} maxScale={20} />
        </Suspense>
      </Canvas>
    </div>
  );
}
