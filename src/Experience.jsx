import { CameraControls, Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";
import CharacterController from "./CharacterController";
import { Physics, CuboidCollider } from "@react-three/rapier";
import Model from "./components/3d/Platform";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import About from "./components/About";
import ThreeD from "./components/ThreeD";
import { useThree } from "@react-three/fiber";
import { useControls, button, buttonGroup, folder } from "leva";
import Computer from "./components/3d/Computer";
import Workbench from "./components/3d/Workbench";
import LightBridge from "./components/3d/shader/LightBridge";
import Sky from "./components/3d/shader/Sky";

export default function Experience({
  setHtmlComponent,
  setShowDiv,
  setShowButtonDiv,
  showButtonDiv,
  cameraControlsRef,
  isComputerClicked,
  setIsComputerClicked,
  minDistance,
  setMinDistance,
  maxDistance,
  setMaxDistance,
}) {
  const isNight = true;
  const computerRef = useRef();
  const workbenchRef = useRef();
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
        cameraControlsRef.current?.fitToBox(computerRef.current, true)
      ),
      setPosition: folder(
        {
          vec2: { value: [-5, 2, 1], label: "vec" },
          "setPosition(…vec)": button((get) => {
            cameraControlsRef.current?.setPosition(
              ...get("setPosition.vec2"),
              true
            );
          }),
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
      setMinDistance(5.0);
      setMaxDistance(10.0);
      cameraControlsRef.current.distance = 5.0;
    }
  };

  const handleMajorMeshClick = (
    custMinDistance,
    custMaxDistance,
    objectPosition,
    meshObjectRef,
    initialZoom
  ) => {
    setIsComputerClicked(true);
    setMinDistance(custMinDistance);
    setMaxDistance(custMaxDistance);
    setMesh(objectPosition);
    setIsMovableCharacter(false);
    if (!showButtonDiv) {
      setShowButtonDiv(true);
    } else {
      setShowButtonDiv(false);
    }
    cameraControlsRef.current?.fitToBox(meshObjectRef, true);
    cameraControlsRef.current.distance = initialZoom;
  };

  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const lerpFactor = 0.1;

  useFrame((state) => {
    const targetPosition = showButtonDiv
      ? isMovableCharacter
        ? body.current.translation()
        : mesh
      : new THREE.Vector3(0, 1, 0);

    smoothedCameraTarget.lerp(targetPosition, lerpFactor);
    state.camera.lookAt(smoothedCameraTarget.x, 1.0, smoothedCameraTarget.z);
  });

  return (
    <>
      <Perf position="top-left" />
      <CameraControls
        ref={cameraControlsRef}
        minDistance={minDistance}
        maxDistance={maxDistance}
        enabled={enabled}
        verticalDragToForward={verticalDragToForward}
        dollyToCursor={dollyToCursor}
        infinityDolly={infinityDolly}
      />
      <Computer
        ref={computerRef}
        isComputerClicked={isComputerClicked}
        onClick={(event) => {
          if (!isComputerClicked) {
            handleMajorMeshClick(
              1.0,
              5.0,
              event.object.position,
              computerRef.current,
              3.0
            );
          }
        }}
      />
      <Workbench
        ref={workbenchRef}
        isComputerClicked={isComputerClicked}
        onClick={(event) => {
          if (!isComputerClicked) {
            handleMajorMeshClick(
              1.0,
              5.0,
              event.object.position,
              workbenchRef.current,
              3.0
            );
          }
        }}
      />
      <Environment preset={isNight ? "night" : "sunset"} />
      <Sky isNight={isNight} />

      {/* CLICKABLE COMPONENTS */}
      <mesh
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
      </mesh>
      <mesh
        position={[-3, 1.5, 3]}
        scale={0.2}
        onPointerEnter={() => {
          document.body.style.cursor = isComputerClicked
            ? "pointer"
            : "default";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        onClick={() => {
          if (isComputerClicked) handleMeshClick(ThreeD);
        }}
      >
        <sphereGeometry args={[1]} />
      </mesh>
      <directionalLight
        castShadow
        color="purple"
        position={[1, 2, 3]}
        intensity={2}
      />
      <ambientLight />
      <LightBridge />
      <Physics>
        <CharacterController
          handleCharacterClick={handleCharacterClick}
          isComputerClicked={isComputerClicked}
          setIsComputerClicked={setIsComputerClicked}
        />
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
