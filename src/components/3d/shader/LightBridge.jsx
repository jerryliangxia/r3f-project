import lightBridgeVertexShader from "../../../shaders/light-bridge/vertex.glsl";
import lightBridgeFragmentShader from "../../../shaders/light-bridge/fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

const LightBridgeMaterial = shaderMaterial(
  {
    uTime: 0,
    uBigWavesElevation: 0,
    uBigWavesFrequency: new THREE.Vector2(4, 1.5),
    uBigWavesSpeed: 0.75,
    uDepthColor: new THREE.Color("#23a2e7"),
    uSurfaceColor: new THREE.Color("#9bd8ff"),
    uColorOffset: 0.08,
    uColorMultiplier: 5,
    uBrightness: 0.8,
  },
  lightBridgeVertexShader,
  lightBridgeFragmentShader
);

extend({ LightBridgeMaterial });

const LightBridge = () => {
  const lightBridgeMaterial = useRef();
  useFrame((state, delta) => {
    lightBridgeMaterial.current.uTime += delta;
  });
  return (
    <mesh
      receiveShadow
      rotation-x={-Math.PI / 2}
      position-x={3.5}
      position-y={0.22}
    >
      <boxGeometry args={[3, 3, 0.05, 512, 512]} />
      <lightBridgeMaterial ref={lightBridgeMaterial} />
    </mesh>
  );
};

export default LightBridge;
