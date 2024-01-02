import { forwardRef, useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useMatcapTexture, Center, Text3D, Html } from "@react-three/drei";
import MiniSpid from "./MiniSpid";
import MiniSymb from "./MiniSymb";
import MiniSymbTendrils from "./MiniSymbTendrils";
import Venom from "./Venom";
import Webshooter from "./Webshooter";
import MiniHand from "./MiniHand";
import PizzaTime from "./PizzaTime";
import CityScene from "./CityScene";
import SpidHead from "./SpidHead";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

const Workbench = forwardRef((props, ref) => {
  const [showHtml, setShowHtml] = useState(false);
  const [matcapTexture] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256);

  useEffect(() => {
    let timeoutId;
    if (props.isComputerClicked) {
      props.setIsActualWorkbenchClicked(true);
    } else {
      setShowHtml(false);
      props.setIsActualWorkbenchClicked(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [props.isComputerClicked, props.isActualWorkbenchClicked]);

  return (
    <>
      <Center position={[-3.6, 1.3, 3.25]} rotation={[0, Math.PI / 2, 0.0]}>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={8}
        >
          3D
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
      <rectAreaLight
        position={[-3.4, 1.6, 3.25]}
        rotation={[-Math.PI / 2, -1.0, 0.0]}
        width={2.0}
        height={2.0}
        intensity={3.0}
        color="#9D47FF"
      />
      <rectAreaLight
        position={[-2.2, 1.0, 3.27]}
        rotation={[-Math.PI / 2, -4.0, 0.0]}
        width={0.6}
        height={1.0}
        intensity={1.0}
        color="pink"
      />
      <mesh
        ref={ref}
        {...props}
        position={[-2.9, 0.7, 3.27]}
        onPointerEnter={() => {
          document.body.style.cursor = props.isComputerClicked
            ? "default"
            : "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        visible={false}
      >
        <boxGeometry args={[1.1, 0.5, 1.1]} />
        <meshStandardMaterial color="#9d4a4a" />
      </mesh>
      <Selection>
        <EffectComposer blur multisampling={16} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={3}
            width={1500}
          />
        </EffectComposer>

        {/* Top row */}
        <MiniSymb
          position={[-3.25, 0.9, 3.3]}
          rotationY={2.0}
          scale={0.12}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />
        <MiniSymbTendrils
          position={[-3.25, 0.87, 3.3]}
          rotationY={2.0}
          scale={0.12}
        />
        <Venom
          position={[-3.3, 0.87, 2.9]}
          rotationY={1.2}
          scale={0.1}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />

        {/* Middle Row */}
        <PizzaTime
          position={[-2.9, 0.85, 2.9]}
          rotationY={1.6}
          scale={0.1}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />
        <MiniSpid
          position={[-2.9, 0.9, 3.3]}
          rotationY={2.0}
          scale={0.1}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />
        <CityScene
          position={[-2.75, 0.873, 3.6]}
          rotationY={1.6}
          scale={0.01}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />

        {/* Bottom row */}
        <Webshooter
          position={[-2.5, 0.9, 3.6]}
          rotationY={1.2}
          scale={0.06}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />
        <SpidHead
          position={[-2.5, 0.88, 3.3]}
          rotationY={1.6}
          scale={0.1}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />
        <MiniHand
          position={[-2.5, 0.9, 2.95]}
          rotationY={1.2}
          scale={0.2}
          isActualWorkbenchClicked={props.isActualWorkbenchClicked}
          setHtmlComponent={props.setHtmlComponent}
          setShowDiv={props.setShowDiv}
        />
      </Selection>
    </>
  );
});

export default Workbench;
