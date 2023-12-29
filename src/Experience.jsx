import {
  Html,
  shaderMaterial,
  ContactShadows,
  CameraControls,
  Environment,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import CharacterController from "./CharacterController";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Model from "./Platform";
import lightBridgeVertexShader from "./shaders/light-bridge/vertex.glsl";
import lightBridgeFragmentShader from "./shaders/light-bridge/fragment.glsl";
import skyVertexShader from "./shaders/sky/vertex.glsl";
import skyFragmentShader from "./shaders/sky/fragment.glsl";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, forwardRef } from "react";
import { Text } from "@radix-ui/themes";
import About from "./components/About";
import ThreeD from "./components/ThreeD";
import { useThree } from "@react-three/fiber";
import { useControls, button, buttonGroup, folder } from "leva";

const isNight = true;

const Computer = forwardRef((props, ref) => {
  return (
    <>
      <mesh
        ref={ref}
        {...props}
        position={[3, 1, -3.5]}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
    </>
  );
});

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

export default function Experience({
  setHtmlComponent,
  setShowDiv,
  setShowButtonDiv,
  showButtonDiv,
  cameraControlsRef,
}) {
  const meshRef = useRef();
  const { camera } = useThree();
  const [body, setBody] = useState(null);
  const [isMovableCharacter, setIsMovableCharacter] = useState(false);
  const [mesh, setMesh] = useState(null);

  // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
  const { enabled, verticalDragToForward, dollyToCursor, infinityDolly } =
    useControls({
      zoomGrp: buttonGroup({
        label: "zoom",
        opts: {
          "/2": () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
          "/-2": () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true),
        },
      }),
      moveTo: folder(
        {
          vec1: { value: [3, 5, 2], label: "vec" },
          "moveTo(…vec)": button((get) =>
            cameraControlsRef.current?.moveTo(...get("moveTo.vec1"), true)
          ),
        },
        { collapsed: true }
      ),
      "fitToBox(mesh)": button(() =>
        cameraControlsRef.current?.fitToBox(meshRef.current, true)
      ),
      setPosition: folder(
        {
          vec2: { value: [-5, 2, 1], label: "vec" },
          "setPosition(…vec)": button((get) =>
            cameraControlsRef.current?.setPosition(
              ...get("setPosition.vec2"),
              true
            )
          ),
        },
        { collapsed: true }
      ),
      setTarget: folder(
        {
          vec3: { value: [3, 0, -3], label: "vec" },
          "setTarget(…vec)": button((get) => {
            console.log(...get("setTarget.vec3"));
            cameraControlsRef.current?.setTarget(
              ...get("setTarget.vec3"),
              true
            );
          }),
        },
        { collapsed: true }
      ),
      setLookAt: folder(
        {
          vec4: { value: [1, 2, 3], label: "position" },
          vec5: { value: [1, 1, 0], label: "target" },
          "setLookAt(…position, …target)": button((get) =>
            cameraControlsRef.current?.setLookAt(
              ...get("setLookAt.vec4"),
              ...get("setLookAt.vec5"),
              true
            )
          ),
        },
        { collapsed: true }
      ),
      lerpLookAt: folder(
        {
          vec6: { value: [-2, 0, 0], label: "posA" },
          vec7: { value: [1, 1, 0], label: "tgtA" },
          vec8: { value: [0, 2, 5], label: "posB" },
          vec9: { value: [-1, 0, 0], label: "tgtB" },
          t: { value: Math.random(), label: "t", min: 0, max: 1 },
          "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
            return cameraControlsRef.current?.lerpLookAt(
              ...get("lerpLookAt.vec6"),
              ...get("lerpLookAt.vec7"),
              ...get("lerpLookAt.vec8"),
              ...get("lerpLookAt.vec9"),
              get("lerpLookAt.t"),
              true
            );
          }),
        },
        { collapsed: true }
      ),
      reset: button(() => cameraControlsRef.current?.reset(true)),
      enabled: { value: true, label: "controls on" },
    });

  const handleMeshClick = (Component) => {
    setHtmlComponent(<Component />);
    setShowDiv(true);
  };

  const handleCharacterClick = (object) => {
    setBody(object);
    if (object.current.translation()) setIsMovableCharacter(true);
    else setIsMovableCharacter(false);
    if (!showButtonDiv) {
      setShowButtonDiv(true);
    } else {
      setShowButtonDiv(false);
    }
  };

  // MeshMatcapMaterial
  const textureLoader = new THREE.TextureLoader();
  const material = new THREE.MeshMatcapMaterial();
  const matcapTexture = textureLoader.load("/matcap/2.png");
  matcapTexture.colorSpace = THREE.SRGBColorSpace;
  material.matcap = matcapTexture;

  const lightBridgeMaterial = useRef();
  const oceanMaterial = useRef();
  const skyMaterial = useRef();
  useFrame((state, delta) => {
    lightBridgeMaterial.current.uTime += delta;
    // oceanMaterial.current.uTime += delta;
  });

  const [smoothedCameraTarget, setSmoothedCameraTarget] = useState(
    () => new THREE.Vector3()
  );
  const lerpFactor = 0.1;

  useFrame((state) => {
    if (showButtonDiv) {
      const bodyPosition = isMovableCharacter
        ? body.current.translation()
        : mesh;
      smoothedCameraTarget.lerp(bodyPosition, lerpFactor);

      setSmoothedCameraTarget(
        new THREE.Vector3(
          smoothedCameraTarget.x,
          smoothedCameraTarget.y,
          smoothedCameraTarget.z
        )
      );
    } else {
      const bodyPosition = new THREE.Vector3(0, 1, 0);
      smoothedCameraTarget.lerp(bodyPosition, lerpFactor);
    }
    state.camera.lookAt(
      new THREE.Vector3(smoothedCameraTarget.x, 1.0, smoothedCameraTarget.z)
    );
  });

  return (
    <>
      <Perf position="top-left" />
      <CameraControls
        ref={cameraControlsRef}
        minDistance={10.0}
        maxDistance={20.0}
        enabled={enabled}
        verticalDragToForward={verticalDragToForward}
        dollyToCursor={dollyToCursor}
        infinityDolly={infinityDolly}
      />
      <Computer
        ref={meshRef}
        onClick={(event) => {
          setMesh(event.object.position);
          setIsMovableCharacter(false);
          if (!showButtonDiv) {
            setShowButtonDiv(true);
          } else {
            setShowButtonDiv(false);
          }
        }}
      />
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
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
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
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
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
        <CharacterController handleCharacterClick={handleCharacterClick} />
        <Model
          onPointerEnter={(event) => event.stopPropagation()}
          receiveShadow
          castShadow
          scale={1}
        />
        <CuboidCollider args={[5, 0.1, 5]} position={[0, 0.2, 0]} />
      </Physics>
    </>
  );
}
