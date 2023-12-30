import skyVertexShader from "../../../shaders/sky/vertex.glsl";
import skyFragmentShader from "../../../shaders/sky/fragment.glsl";
import { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

const Sky = ({ isNight }) => {
  const SkyMaterial = shaderMaterial(
    {
      uTexture: new THREE.TextureLoader().load(
        isNight ? "nightsky.jpg" : "sky.jpg"
      ),
    },
    skyVertexShader,
    skyFragmentShader
  );
  extend({ SkyMaterial });

  const skyMaterial = useRef();

  return (
    <mesh>
      <sphereGeometry args={[100, 256, 256]} />
      <skyMaterial ref={skyMaterial} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Sky;
