/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function MiniSymbTendrils(props) {
  const { nodes } = useGLTF("/symb_tendrils.glb");
  const material = new THREE.MeshStandardMaterial({
    color: "black",
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
    
            float angle = (sin(position.y + uTime * 2.0)) * 0.1;
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
      scale={0.12}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={material}
        position={[0.052, -0.12, 0.234]}
        rotation={[-2.996, -0.786, -3.071]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
        rotation={[-Math.PI, 0.008, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={material}
        position={[0.237, -0.157, 0.265]}
        rotation={[-0.001, -0.028, 0.115]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={material}
        position={[-0.064, -0.124, 0.151]}
        rotation={[-3.116, -1.033, -3.101]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={material}
        position={[-0.017, -0.213, 0.112]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008.geometry}
        material={material}
        position={[0.058, -0.154, -0.032]}
        rotation={[-0.022, -0.001, -0.031]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder009.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
        rotation={[-Math.PI, 0.008, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder010.geometry}
        material={material}
        position={[-0.095, -0.118, 0.34]}
        rotation={[-0.009, 0.003, -0.016]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder011.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder012.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
        rotation={[-Math.PI, 0.008, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder013.geometry}
        material={material}
        position={[0.054, -0.2, 0.163]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder014.geometry}
        material={material}
        position={[0.099, -0.124, 0.111]}
      />
    </group>
  );
}

useGLTF.preload("/symb_tendrils.glb");
