import {
  Html,
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
import skyVertexShader from "./shaders/sky/vertex.glsl";
import skyFragmentShader from "./shaders/sky/fragment.glsl";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Card, Text } from "@radix-ui/themes";
import About from "./components/About";
import ThreeD from "./components/ThreeD";

const isNight = true;

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

const SkyMaterial = shaderMaterial(
  {
    uTexture: new THREE.TextureLoader().load(
      isNight ? "nightsky.jpg" : "sky.jpg"
    ),
  },
  skyVertexShader,
  skyFragmentShader
);

extend({ LightBridgeMaterial, OceanMaterial, SkyMaterial });

export default function Experience({ setHtmlComponent, setShowDiv }) {
  const handleMeshClick = (Component) => {
    setHtmlComponent(<Component />);
    setShowDiv(true);
  };

  // MeshMatcapMaterial
  const textureLoader = new THREE.TextureLoader();
  const material = new THREE.MeshMatcapMaterial();
  const matcapTexture = textureLoader.load("/matcap/2.png");
  matcapTexture.colorSpace = THREE.SRGBColorSpace;
  material.matcap = matcapTexture;

  // const { sunPosition } = useControls("sky", {
  //   sunPosition: { value: [1, 2, 3] },
  // });
  const lightBridgeMaterial = useRef();
  const oceanMaterial = useRef();
  const skyMaterial = useRef();
  useFrame((state, delta) => {
    lightBridgeMaterial.current.uTime += delta;
    // oceanMaterial.current.uTime += delta;
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      <Environment preset={isNight ? "night" : "sunset"} />
      <mesh>
        <sphereGeometry args={[100, 256, 256]} />
        <skyMaterial ref={skyMaterial} side={THREE.DoubleSide} />
      </mesh>

      {/* CLICKABLE COMPONENTS */}
      <mesh
        material={material}
        position={[3.5, 1, 3]}
        scale={0.2}
        onClick={() => handleMeshClick(About)}
      >
        <sphereGeometry args={[1]} />
        <Html distanceFactor={4} position-y={1}>
          <Text color="white">About</Text>
        </Html>
      </mesh>

      <mesh
        material={material}
        position={[-3.5, 1, 3]}
        scale={0.2}
        onClick={() => handleMeshClick(ThreeD)}
      >
        <sphereGeometry args={[1]} />
        <Html distanceFactor={4} position-y={1}>
          <Text color="white">3D</Text>
        </Html>
      </mesh>

      <directionalLight
        castShadow
        color="purple"
        position={[1, 2, 3]}
        intensity={2}
      />
      <ambientLight />
      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        position-x={3.5}
        position-y={0.22}
      >
        <boxGeometry args={[3, 3, 0.05, 512, 512]} />
        <lightBridgeMaterial ref={lightBridgeMaterial} />
      </mesh>
      {/* <mesh rotation-x={-Math.PI / 2} position-y={-10}>
        <planeGeometry args={[400, 400, 128, 128]} />
        <oceanMaterial ref={oceanMaterial} />
      </mesh> */}
      <Physics>
        <CharacterController />
        <Model receiveShadow castShadow scale={1} />
        <CuboidCollider args={[5, 0.1, 5]} position={[0, 0.2, 0]} />
      </Physics>
    </>
  );
}
