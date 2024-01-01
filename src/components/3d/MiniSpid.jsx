/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function MiniSpid(props) {
  const { nodes, materials } = useGLTF("/minispid.glb");
  const material = new THREE.MeshStandardMaterial({
    color: "white",
  });

  const customUniforms = {
    uTime: { value: 0 },
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
    
            float angle = (sin(position.y + uTime)) * 0.07;
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
  });

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
        geometry={nodes.Cube.geometry}
        material={material}
      />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Spider-Man_Redmesh"].geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Spider-Man_Redmesh_1"].geometry}
          material={materials.Blue}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Spider-Man_Redmesh_2"].geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Spider-Man_Redmesh_3"].geometry}
          material={materials.White}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/minispid.glb");