/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import SpidHeadDiv from "../3d-descriptions/SpidHead";
import { Select } from "@react-three/postprocessing";

export default function SpidHead(props) {
  const { nodes, materials } = useGLTF("/minifbspidhead.glb");
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
        position={props.position.map(
          (value, index) => value + [0, -0.02, 0][index]
        )}
        rotation-y={props.rotationY + 0.4}
        scale={props.scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(event) => {
          event.stopPropagation();
          props.setHtmlComponent(<SpidHeadDiv />);
          props.setShowDiv(true);
        }}
      >
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.S_OUT.geometry}
          material={materials.BLACK_MAT}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.S_INNER.geometry}
          material={materials.BLACK_MAT}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.WEBS.geometry}
          material={materials.BLACK_MAT}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.EYES.geometry}
          material={materials.EYES}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.Brown}
        />
        <mesh
          // castShadow
          // receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials.Red}
        />
      </group>
    </Select>
  );
}

useGLTF.preload("/minifbspidhead.glb");
