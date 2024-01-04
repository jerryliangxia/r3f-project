import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Grassblade(props) {
  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: props.color,
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

            float angle = (sin(position.y + uTime * 1.0));
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
    setUTime((prevUTime) => prevUTime + delta);
  });

  const verticesCount = 3 * 3;
  const vertices = new Float32Array([
    // Left corner - BR
    -0.25, 0, 0,
    // Right corner - BR
    0.35, 0, 0.1,
    // Top right corner - BR
    0.25, 1, 0,
    // Top left corner - TL
    -0.25, 1.25, 0.1,
    // Bottom left corner - TL
    -0.25, 0, 0,
    // Top right corner - TL
    0.25, 1, 0,
    // Top corner - TT
    0, 2, -0.25,
    // Bottom left corner - TT
    -0.25, 1.25, 0.1,
    // Bottom right corner - TT
    0.25, 1, 0,
  ]);

  return (
    <mesh
      material={material}
      position={props.position}
      scale={props.scale}
      rotation={props.rotation}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={vertices}
        />
      </bufferGeometry>
    </mesh>
  );
}
