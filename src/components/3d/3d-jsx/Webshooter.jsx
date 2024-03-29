/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState } from "react";
import { Select } from "@react-three/postprocessing";
import WebshooterDiv from "../3d-descriptions/Webshooter";
import { useGLTF } from "@react-three/drei";

export default function Webshooter(props) {
  const { nodes, materials } = useGLTF("/minifbwebshooter.glb");
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
        scale={props.scale * 0.6}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(event) => {
          event.stopPropagation();
          props.setHtmlComponent(<WebshooterDiv />);
          props.setShowDiv(true);
        }}
      >
        <group position={[0, 0.764, 0]} rotation={[-Math.PI / 4, 0, 0]}>
          <mesh
            geometry={nodes.Base_Red.geometry}
            material={materials.Red}
            position={[0, -2.378, 0.238]}
          />
          <mesh
            geometry={nodes.Black_Inside.geometry}
            material={materials.Black}
            position={[0, -3.256, 0.287]}
          />
          <mesh
            geometry={nodes.Bottom_Round_Base.geometry}
            material={materials.Black}
            position={[0, -3.256, 0.238]}
          />
          <mesh
            geometry={nodes.Camera_Bottom_Surrounding001.geometry}
            material={materials.Gray}
            position={[0, -3.256, 0.238]}
          />
          <mesh
            geometry={nodes.Cylinder_Base.geometry}
            material={materials.Gray}
            position={[0, -0.262, 0.003]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.11, -0.228, -0.11]}
          />
          <mesh
            geometry={nodes.Cylinder_Base001.geometry}
            material={materials.Gray}
            position={[0, -0.262, 0.003]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.11, -0.228, -0.11]}
          />
          <mesh
            geometry={nodes.Metal_Bottom_Back.geometry}
            material={materials.Gray}
            position={[-0.002, -3.251, 0.239]}
          />
          <mesh
            geometry={nodes.Metal_Bottom_Top.geometry}
            material={materials.Gray}
            position={[0, -3.25, 0.238]}
          />
          <mesh
            geometry={nodes.Metallic_Outer.geometry}
            material={materials.Gray}
            position={[0, -3.256, 0.238]}
          />
          <mesh
            geometry={nodes.Camera_Bottom_Surrounding.geometry}
            material={materials.Gray}
            position={[0, -3.256, 0.238]}
          />
        </group>
      </group>
    </Select>
  );
}

useGLTF.preload("/minifbwebshooter.glb");
