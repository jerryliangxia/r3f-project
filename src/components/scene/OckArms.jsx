import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useTexture, Cloud } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function OckArms({ startPosition = [0, 90, 0] }) {
  const group = useRef();
  const { nodes, animations } = useGLTF("/ock_arm.glb");
  const { actions } = useAnimations(animations, group);
  const texture = useTexture("/images/scene/ock_arm.png");
  const materialRef = useRef();
  const speed = 0.05;

  useEffect(() => {
    if (actions.Idle3) {
      actions.Idle3.play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    group.current.rotation.y -= delta * speed;
  });

  return (
    <>
      <group ref={group} position={startPosition} scale={2.5} dispose={null}>
        <group name="Scene">
          <group name="Armature" position={[0, -61.863, 0]} scale={2.355}>
            <skinnedMesh
              name="Cube"
              geometry={nodes.OckArm.geometry}
              skeleton={nodes.OckArm.skeleton}
            >
              <meshStandardMaterial
                ref={materialRef}
                map={texture}
                map-flipY={false}
              />
            </skinnedMesh>
            <primitive object={nodes.Bone} />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/ock_arm.glb");
