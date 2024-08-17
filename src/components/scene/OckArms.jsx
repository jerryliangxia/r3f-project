import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useTexture, Cloud } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

export default function OckArms({
  startPosition = [-19, 2, 10],
  direction = [0.6, 0.2, -1],
}) {
  const group = useRef();
  const { nodes, animations } = useGLTF("/ock_arm.glb");
  const { actions } = useAnimations(animations, group);
  const texture = useTexture("/images/scene/ock_arm.png");
  const materialRef = useRef();
  const directionVector = useRef(new THREE.Vector3(...direction).normalize());

  useEffect(() => {
    if (actions.Idle2) {
      actions.Idle2.play();
    }
  }, [actions]);

  const { rotationX, rotationY, rotationZ } = useControls({
    rotationX: { value: -1.0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: {
      value: -3.1,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
    rotationZ: { value: 0.5, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  useFrame((state, delta) => {
    group.current.position.add(
      directionVector.current.clone().multiplyScalar(delta * 0.5)
    );
  });

  return (
    <>
      <group
        ref={group}
        rotation={[rotationX, rotationY, rotationZ]}
        position={startPosition}
        dispose={null}
      >
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
