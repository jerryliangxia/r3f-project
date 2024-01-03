import React from "react";
import SymbHead from "./SymbHead";
import MiniSymb from "./MiniSymb";
import Venom from "./Venom";
import CityScene from "./CityScene";
import MiniSpid from "./MiniSpid";
import PizzaTime from "./PizzaTime";
import Webshooter from "./Webshooter";
import SpidHead from "./SpidHead";
import MiniHand from "./MiniHand";
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
    <Selection>
      <EffectComposer blur multisampling={16} autoClear={false}>
        <Outline blur visibleEdgeColor="white" edgeStrength={3} width={1500} />
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
  );
};

export default WorkbenchGrid;
