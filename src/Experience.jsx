import {
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

export default function Experience() {
  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
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
