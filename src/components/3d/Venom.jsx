/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import VenomDiv from "./3d-descriptions/Venom";
import * as THREE from "three";

export default function Venom(props) {
  const { nodes, materials } = useGLTF("/venom.glb");
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

  const material = new THREE.MeshStandardMaterial({
    color: "#94002C",
  });
  const [uTime, setUTime] = useState(0);

  const customUniforms = {
    uTime: { value: uTime },
  };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = customUniforms.uTime;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `
            #include <common>

            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle)
            {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }
        `
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <beginnormal_vertex>",
      `
            #include <beginnormal_vertex>
    
            float angle = (sin(position.y + uTime)) * 0.1;
            mat2 rotateMatrix = get2dRotateMatrix(angle);
    
            objectNormal.xz = rotateMatrix * objectNormal.xz;
        `
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
            #include <begin_vertex>
    
            transformed.xz = rotateMatrix * transformed.xz;
        `
    );
  };

  useFrame((state, delta) => {
    customUniforms.uTime.value += delta;
    setUTime((prevUTime) => (prevUTime + delta) % 50);
  });

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
          props.setHtmlComponent(<VenomDiv />);
          props.setShowDiv(true);
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rock.geometry}
          material={materials.Gray}
          position={[0.849, 0.138, 1.211]}
          scale={0.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Venommesh.geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Venommesh_1.geometry}
          material={materials.White}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Venommesh_2.geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Venommesh001.geometry}
          material={materials.White}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Venommesh001_1.geometry}
          material={material}
        />
      </group>
    </Select>
  );
}

useGLTF.preload("/venom.glb");
