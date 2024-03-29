/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import MiniSpidDiv from "../3d-descriptions/MiniSpid";

export default function MiniSpid(props) {
  const { nodes, materials } = useGLTF("/minispid.glb");
  const [enabled, setEnabled] = useState(false);
  let timeoutId = null;

  const handlePointerOver = (event) => {
    event.stopPropagation();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    document.body.style.cursor = "pointer";
    setEnabled(true);
  };

  const handlePointerOut = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      document.body.style.cursor = "default";
      setEnabled(false);
    }, 10); // delay in milliseconds
  };

  return (
    <Select enabled={enabled && props.isActualWorkbenchClicked}>
      <group
        {...props}
        dispose={null}
        position={props.position}
        rotation-y={props.rotationY + 0.8}
        scale={props.scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(event) => {
          event.stopPropagation();
          props.setHtmlComponent(<MiniSpidDiv />);
          props.setShowDiv(true);
        }}
      >
        <mesh castShadow receiveShadow geometry={nodes.Cube.geometry}>
          <meshBasicMaterial color="white" />
        </mesh>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes["Spider-Man_Redmesh"].geometry}
            material={materials.Red}
          />
          <mesh
            geometry={nodes["Spider-Man_Redmesh_1"].geometry}
            material={materials.Blue}
          />
          <mesh
            geometry={nodes["Spider-Man_Redmesh_2"].geometry}
            material={materials.Black}
          />
          <mesh
            geometry={nodes["Spider-Man_Redmesh_3"].geometry}
            material={materials.White}
          />
        </group>
      </group>
    </Select>
  );
}

useGLTF.preload("/minispid.glb");
