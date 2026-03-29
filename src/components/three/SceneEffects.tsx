"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

export default function SceneEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={2.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        kernelSize={KernelSize.MEDIUM}
      />
    </EffectComposer>
  );
}
