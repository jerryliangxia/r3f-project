/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CityScene(props) {
  const { nodes, materials } = useGLTF("/cityscene.glb");
  const material = new THREE.MeshStandardMaterial({
    color: "#E73DE2",
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
        
                float angle = (sin(position.x + uTime * 0.1) * 0.5) * 0.15;
                angle *= sin(position.y * uTime * 0.4) * 0.075;
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
        geometry={nodes.Cube007.geometry}
        material={materials["Gray 2"]}
        position={[-7.888, 2.385, -13.415]}
        rotation={[0, 0.134, 0]}
        scale={[0.994, 2.374, 0.584]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials.Gray}
        position={[-5.862, 1.799, -14.464]}
        rotation={[0, 0.134, 0]}
        scale={[1, 1.688, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials.Gray}
        position={[0.556, 2.661, -15.459]}
        rotation={[0, 0.134, 0]}
        scale={[0.914, 2.624, 0.636]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials["Gray 2"]}
        position={[0.733, 3.595, -17.905]}
        rotation={[0, 0.134, 0]}
        scale={[1.293, 3.51, 0.843]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials["Gray 3"]}
        position={[-1.619, 2.926, -16.518]}
        rotation={[0, 0.134, 0]}
        scale={[0.932, 2.738, 0.932]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials["Gray 3"]}
        position={[-4.374, 2.541, -11.984]}
        rotation={[0, 0.134, 0]}
        scale={[0.622, 2.494, 0.622]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={materials["Gray 2"]}
        position={[2.608, 4.473, -16.496]}
        rotation={[0, 0.134, 0]}
        scale={[0.747, 4.453, 0.747]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials["Gray 2"]}
        position={[-2.067, 3.439, -13.603]}
        rotation={[0, 0.134, 0]}
        scale={[0.911, 3.429, 0.911]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Gray 4"]}
        position={[-0.923, 0, -16.803]}
        rotation={[0, 0.086, 0]}
        scale={[8.507, 1, 3.902]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials["Gray 4"]}
        position={[4.304, 4.473, -17.514]}
        rotation={[0, 0.134, 0]}
        scale={[0.744, 4.453, 0.558]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={materials["Gray 3"]}
        position={[4.644, 6.062, -19.725]}
        rotation={[0, 0.134, 0]}
        scale={[1.003, 6.001, 0.752]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube018.geometry}
        material={materials["Gray 4"]}
        position={[-2.043, 2.31, -11.776]}
        rotation={[0, 0.134, 0]}
        scale={[0.677, 2.026, 0.467]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube019.geometry}
        material={materials["Gray 3"]}
        position={[1.295, 2.108, -12.794]}
        rotation={[0, -1.425, 0]}
        scale={[0.758, 2.026, 0.468]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube020.geometry}
        material={materials["Gray 3"]}
        position={[-2.234, 2.042, -10.605]}
        rotation={[0, 0.134, 0]}
        scale={[0.677, 2.026, 0.467]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube021.geometry}
        material={materials["Gray 3"]}
        position={[2.422, 2.108, -13.483]}
        rotation={[0, -1.425, 0]}
        scale={[0.677, 2.026, 0.467]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube022.geometry}
        material={materials["Gray 3"]}
        position={[-0.533, 2.108, -12.236]}
        rotation={[0, -1.425, 0]}
        scale={[0.677, 2.026, 0.467]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube023.geometry}
        material={materials["Gray 3"]}
        position={[1.585, 1.143, -21.607]}
        rotation={[0, 0.134, 0]}
        scale={[1.161, 6.907, 1.094]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube024.geometry}
        material={materials["Gray 3"]}
        position={[1.585, 5.262, -21.607]}
        rotation={[0, 0.134, 0]}
        scale={[0.86, 5.12, 0.811]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube025.geometry}
        material={materials["Gray 3"]}
        position={[1.585, 6.931, -21.607]}
        rotation={[0, 0.134, 0]}
        scale={[0.765, 4.555, 0.722]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube026.geometry}
        material={materials["Gray 3"]}
        position={[1.585, 9.128, -21.607]}
        rotation={[0, 0.134, 0]}
        scale={[0.647, 3.848, 0.61]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube027.geometry}
        material={materials["Gray 3"]}
        position={[1.585, 11.151, -21.607]}
        rotation={[0, 0.134, 0]}
        scale={[0.244, 1.451, 0.23]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube028.geometry}
        material={materials["Gray 3"]}
        position={[1.585, 7.807, -21.607]}
        rotation={[0, 0.134, 0]}
        scale={[0.636, 3.782, 0.599]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube029.geometry}
        material={materials["Gray 3"]}
        position={[3.717, 2.108, -12.9]}
        rotation={[0, -1.425, 0]}
        scale={[0.513, 2.026, 0.465]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube030.geometry}
        material={materials["Gray 3"]}
        position={[3.786, 2.108, -12.52]}
        rotation={[0, -1.425, 0]}
        scale={[0.465, 1.834, 0.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube031.geometry}
        material={materials["Gray 3"]}
        position={[4.95, 2.298, -13.225]}
        rotation={[0, -1.425, 0]}
        scale={[0.513, 2.026, 0.465]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube032.geometry}
        material={materials["Gray 3"]}
        position={[5.353, 2.488, -13.383]}
        rotation={[0, -1.425, 0]}
        scale={[0.511, 2.026, 0.328]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube033.geometry}
        material={materials["Gray 3"]}
        position={[1.585, 11.291, -21.607]}
        rotation={[0, 0.134, 0]}
        scale={[0.052, 0.973, 0.049]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube034.geometry}
        material={materials["Gray 3"]}
        position={[6.033, 3.219, -21.247]}
        rotation={[0, 0.134, 0]}
        scale={[0.56, 2.944, 0.42]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube035.geometry}
        material={materials["Gray 2"]}
        position={[7.186, 3.219, -21.02]}
        rotation={[0, -1.442, 0]}
        scale={[0.56, 2.944, 0.42]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036.geometry}
        material={materials["Gray 2"]}
        position={[6.487, 3.181, -15.181]}
        rotation={[0, 0.134, 0]}
        scale={[0.56, 2.944, 0.42]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube037.geometry}
        material={materials.Gray}
        position={[-1.549, 1.799, -18.418]}
        rotation={[0, 0.134, 0]}
        scale={[0.801, 1.351, 0.801]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["Gray 3"]}
        position={[2.689, 1.272, -13.937]}
        rotation={[0, 0.133, 0]}
        scale={[0.504, 1.077, 0.727]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Portal.geometry}
        material={material}
        position={[-9.26, -19.04, -39.78]}
        rotation={[Math.PI / 2, -0.08, -0.35]}
        scale={1.79}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Gray 4"]}
        position={[3.305, 0, -4.888]}
        rotation={[0, -0.434, 0]}
        scale={[1, 1, 0.385]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Gray 4"]}
        position={[3.305, 0, -4.888]}
        rotation={[0, -0.434, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Gray 4"]}
        position={[3.305, 0, -4.888]}
        rotation={[0, -0.434, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials["Gray 4"]}
        position={[3.305, 0, -4.888]}
        rotation={[0, -0.434, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials["Gray 4"]}
        position={[3.305, 0, -4.888]}
        rotation={[0, -0.434, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials["Gray 4"]}
        position={[3.305, -0.509, -4.888]}
        rotation={[0, -0.434, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials["Gray 4"]}
        position={[3.305, 0, -4.888]}
        rotation={[0, -0.434, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials["Gray 4"]}
        scale={[2.503, 1, 0.385]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Gray 3"]}
        position={[3.305, 3.089, -4.888]}
        rotation={[0, -0.434, 0]}
        scale={[1, 1, 9.05]}
      />
    </group>
  );
}

useGLTF.preload("/cityscene.glb");
