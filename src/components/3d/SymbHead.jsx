/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function SymbHead(props) {
  const { nodes, materials } = useGLTF("/minifbsymbhead.glb");
  return (
    <group
      {...props}
      dispose={null}
      position={props.position}
      rotation-y={props.rotationY}
      scale={props.scale}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EYES_SYMB.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IN_HEAD.geometry}
        material={materials["Head.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.OUT_HEAD.geometry}
        material={materials["Head.003"]}
      />
    </group>
  );
}

useGLTF.preload("/minifbsymbhead.glb");
