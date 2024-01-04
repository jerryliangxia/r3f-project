import React from "react";
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

const WorkbenchGrid = ({
  centerPosition,
  offset,
  rotationY,
  scale,
  ...props
}) => {
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
    <group>
      <Selection>
        <EffectComposer blur multisampling={16} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={3}
            width={1500}
          />
        </EffectComposer>

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
      </Selection>
    </group>
  );
};

export default WorkbenchGrid;
