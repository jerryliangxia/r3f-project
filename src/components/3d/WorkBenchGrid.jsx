import React, { forwardRef } from "react";
import SymbHead from "./3d-jsx/SymbHead";
import MiniSymb from "./3d-jsx/MiniSymb";
import Venom from "./3d-jsx/Venom";
import CityScene from "./3d-jsx/CityScene";
import MiniSpid from "./3d-jsx/MiniSpid";
import PizzaTime from "./3d-jsx/PizzaTime";
import Webshooter from "./3d-jsx/Webshooter";
import SpidHead from "./3d-jsx/SpidHead";
import MiniHand from "./3d-jsx/MiniHand";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

const Row = ({ Component, position, rotationY, scale, ...props }) => (
  <Component
    position={position}
    rotationY={rotationY}
    scale={scale}
    {...props}
  />
);

// forwardRef((props, ref) => {
const WorkbenchGrid = forwardRef((props, ref) => {
  const offset = props.offset;
  const rotationY = props.rotationY;
  const scale = props.scale;
  const centerPosition = props.centerPosition;

  const positions = [
    [-offset, 0, offset],
    [-offset, 0, 0],
    [-offset, 0, -offset],
    [0, 0, offset],
    [0, 0, 0],
    [0, 0, -offset],
    [offset, 0, offset],
    [offset, 0, 0],
    [offset, 0, -offset],
  ].map(([x, y, z]) => [
    x + centerPosition[0],
    y + centerPosition[1],
    z + centerPosition[2],
  ]);

  const components = [
    SymbHead,
    MiniSymb,
    Venom,
    CityScene,
    MiniSpid,
    PizzaTime,
    Webshooter,
    SpidHead,
    MiniHand,
  ];

  return (
    <>
      <group ref={ref}>
        {components.map((Component, i) => (
          <Row
            key={i}
            Component={Component}
            position={positions[i]}
            rotationY={rotationY}
            scale={scale}
            {...props}
          />
        ))}
      </group>
      <mesh
        ref={props.meshRef}
        position={props.centerPosition.map(
          (value, index) => value + [0, -0.08, 0][index]
        )}
      >
        <boxGeometry args={[1.22, 0.5, 1.05]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </>
  );
});

export default WorkbenchGrid;
