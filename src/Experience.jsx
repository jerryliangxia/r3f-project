import {
  ContactShadows,
  Sky,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import CharacterController from "./CharacterController";
import { Physics, RigidBody } from "@react-three/rapier";
import Model from "./Platform";

export default function Experience() {
  return (
    <>
      {/* <Sky /> */}
      <Perf position="top-left" />

      <OrbitControls />

      <directionalLight castShadow position={[1, 2, 3]} intensity={2} />
      <ambientLight intensity={1} />
      <ContactShadows position={[0, 0.01, 0]} />
      <Environment
        background
        // preset="sunset"
        // ground={{
        //   height: envMapHeight,
        //   radius: envMapRadius,
        //   scale: envMapScale,
        // }}
        files="/drakensberg_solitary_mountain_puresky_4k.hdr"
      ></Environment>
      <Physics debug>
        <CharacterController />
        <RigidBody type="fixed" friction={1}>
          {/* <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[2, 1.5, 2]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh> */}
          <Model scale={1} />
        </RigidBody>
      </Physics>
    </>
  );
}
