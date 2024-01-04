import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Grassblade from "./Grassblade";

export default function Grass(props) {
  const colors = ["#1D972A", "#38975E", "#599739"];

  return (
    <group scale={0.5} position={[0, 0, 2]}>
      {[...Array(15)].map((value, index) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <Grassblade
            key={index}
            color={color}
            position={[
              (Math.random() - 0.5) * 12,
              0,
              (Math.random() - 0.5) * 12,
            ]}
            scale={0.1 + Math.random() * 0.1}
            rotation={[0, Math.random() * Math.PI, 0]}
          />
        );
      })}
    </group>
  );
}
