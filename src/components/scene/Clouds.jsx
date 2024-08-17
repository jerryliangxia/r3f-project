import React from "react";
import { Clouds, Cloud } from "@react-three/drei";
import * as THREE from "three";

export default function SurroundingClouds() {
  return (
    <>
      <Clouds limit={400} material={THREE.MeshLambertMaterial}>
        {/* Right cloud */}
        <Cloud
          seed={1}
          speed={0.6}
          growth={4}
          volume={50}
          opacity={0.15}
          bounds={[0.5, 0.5, 16]}
          position={[25, 0, 0]}
        />
        {/* Left cloud */}
        <Cloud
          seed={2}
          speed={0.5}
          growth={3}
          volume={50}
          opacity={0.1}
          bounds={[0.5, 0.5, 12]}
          position={[-25, 5, 0]}
          rotation={[(5 * Math.PI) / 6, 0, 0]}
        />
        {/* Front cloud */}
        <Cloud
          seed={3}
          speed={0.4}
          growth={2}
          volume={50}
          opacity={0.1}
          bounds={[0.5, 0.5, 32]}
          position={[0, -10, -25]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Cloud
          seed={4}
          speed={0.3}
          growth={1}
          volume={50}
          opacity={0.15}
          bounds={[0.5, 0.5, 32]}
          position={[10, 20, -25]}
          rotation={[0, Math.PI / 2, 0]}
        />
        {/* Back cloud */}
        <Cloud
          seed={5}
          speed={0.3}
          growth={1}
          volume={50}
          opacity={0.1}
          bounds={[0.5, 0.5, 32]}
          position={[0, 10, 25]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </Clouds>
      <ambientLight color="#E59413" />
    </>
  );
}
