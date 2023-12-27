import {
  shaderMaterial,
  ContactShadows,
  Sky,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import CharacterController from "./CharacterController";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Model from "./Platform";
import { useControls } from "leva";
import lightBridgeVertexShader from "./shaders/light-bridge/vertex.glsl";
import lightBridgeFragmentShader from "./shaders/light-bridge/fragment.glsl";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
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

const OceanMaterial = shaderMaterial(
  {
    uTime: 0,
    uBigWavesElevation: 0.1,
    uBigWavesFrequency: new THREE.Vector2(20, 20),
    uBigWavesSpeed: 1,
    uDepthColor: new THREE.Color("#195576"),
    uSurfaceColor: new THREE.Color("#2772a0"),
    uColorOffset: 0.3,
    uColorMultiplier: 1.3,
    uBrightness: 0.7,
  },
  lightBridgeVertexShader,
  lightBridgeFragmentShader
);

extend({ LightBridgeMaterial, OceanMaterial });

export default function Experience() {
  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });
  const lightBridgeMaterial = useRef();
  const oceanMaterial = useRef();
  useFrame((state, delta) => {
    lightBridgeMaterial.current.uTime += delta;
    oceanMaterial.current.uTime += delta;
  });

  return (
    <>
      <Sky
        sunPosition={sunPosition}
        exposure={0.3}
        mieDirectionalG={0.6}
        turbidity={10}
        mieCoefficient={0.002}
        elevation={9}
      />
      <Perf position="top-left" />

      <OrbitControls />

      <directionalLight castShadow position={[1, 2, 3]} intensity={2} />
      <ambientLight intensity={1} />
      <ContactShadows position={[0, 0.01, 0]} />
      {/* <Environment
        background
        // preset="sunset"
        // ground={{
        //   height: envMapHeight,
        //   radius: envMapRadius,
        //   scale: envMapScale,
        // }}
        // intensity={1}
        files="/drakensberg_solitary_mountain_puresky_4k.hdr"
      ></Environment> */}
      {/* <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        position-z={3.5}
        position-y={0.22}
      >
        <boxGeometry args={[3, 3, 0.05, 256, 256]} />
        <lightBridgeMaterial ref={lightBridgeMaterial} />
      </mesh> */}
      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        position-x={3.5}
        position-y={0.22}
      >
        <boxGeometry args={[3, 3, 0.05, 512, 512]} />
        <lightBridgeMaterial ref={lightBridgeMaterial} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-10}>
        <planeGeometry args={[400, 400, 128, 128]} />
        <oceanMaterial ref={oceanMaterial} />
      </mesh>
      <Physics>
        <CharacterController />
        {/* <RigidBody type="fixed" friction={1} position-y={-0.5}> */}
        {/* <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="ivory" />
          </mesh>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[2, 1.5, 2]} />
            <meshStandardMaterial color="ivory" />
          </mesh> */}
        <Model scale={1} />
        <CuboidCollider args={[5, 0.1, 5]} position={[0, 0.2, 0]} />
        {/* </RigidBody> */}
      </Physics>
    </>
  );
}
