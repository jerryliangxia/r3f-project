/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import MiniSymbDiv from "../3d-descriptions/MiniSymb";
import MiniSymbTendrils from "./MiniSymbTendrils";

export default function MiniSymb(props) {
  const { nodes, materials } = useGLTF("/symb_body.glb");
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
    <>
      <Select enabled={enabled && props.isActualWorkbenchClicked}>
        <group
          {...props}
          dispose={null}
          position={props.position.map(
            (value, index) => value + [0.05, 0, 0][index]
          )}
          rotation-y={props.rotationY + 0.8}
          scale={props.scale * 1.2}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={(event) => {
            event.stopPropagation();
            props.setHtmlComponent(<MiniSymbDiv />);
            props.setShowDiv(true);
          }}
        >
          <mesh
            geometry={nodes["Spider-Manmesh001"].geometry}
            material={materials.Black}
          />
          <mesh
            geometry={nodes["Spider-Manmesh001_1"].geometry}
            material={materials.White}
          />
        </group>
      </Select>
      <MiniSymbTendrils
        position={props.position.map(
          (value, index) => value + [0.05, 0, 0][index]
        )}
        rotationY={props.rotationY + 0.8}
        scale={props.scale * 1.2}
      />
    </>
  );
}

useGLTF.preload("/symb_body.glb");
