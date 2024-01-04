import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Grassblade from "./Grassblade";

export default function Grass(props) {
  const colors = ["#1D972A", "#38975E", "#599739"];

  return (
    <group scale={0.5}>
      {[...Array(100)].map((value, index) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <Grassblade
            key={index}
            color={color}
            position={[
              (Math.random() - 0.5) * 10,
              0,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[0, Math.random() * Math.PI, 0]}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload("/grass.glb");
