/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState } from "react";
import { Select } from "@react-three/postprocessing";
import HandDiv from "./3d-descriptions/Hand";
import { useGLTF } from "@react-three/drei";

export default function MiniHand(props) {
  const { nodes, materials } = useGLTF("/minifbhand.glb");
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
        rotation-y={props.rotationY}
        scale={props.scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(event) => {
          event.stopPropagation();
          props.setHtmlComponent(<HandDiv />);
          props.setShowDiv(true);
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hand.geometry}
          material={materials.Red}
          position={[0.01, -0.019, 0.018]}
          scale={3.253}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Webs.geometry}
          material={materials.Black}
          position={[0.02, 0.257, -0.161]}
          scale={0.036}
        />
      </group>
    </Select>
  );
}

useGLTF.preload("/minifbhand.glb");
