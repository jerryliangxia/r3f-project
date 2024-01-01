import { Html, useGLTF } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import MiniSpid from "./MiniSpid";
import MiniSymb from "./MiniSymb";
import MiniSymbTendrils from "./MiniSymbTendrils";
import Venom from "./Venom";
import Webshooter from "./Webshooter";
import MiniHand from "./MiniHand";
import PizzaTime from "./PizzaTime";
import CityScene from "./CityScene";
import Spid from "./shader/Spid";
import SpidHead from "./SpidHead";
// import { RectAreaLight, RectAreaLightHelper } from "@react-three/drei";

const Workbench = forwardRef((props, ref) => {
  const [showHtml, setShowHtml] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (props.isComputerClicked) {
      timeoutId = setTimeout(() => {
        setShowHtml(true);
      }, 1000);
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
        {/* {showHtml && props.isActualWorkbenchClicked && <></>} */}
        <boxGeometry args={[1.1, 0.5, 1.1]} />
        <meshStandardMaterial color="#9d4a4a" />
      </mesh>
      {/* <Spid position={[-2.3, 0.88, 2.34]} rotationY={1.6} scale={0.4} /> */}
      {/* Top row */}
      <MiniSymb position={[-3.25, 0.9, 3.3]} rotationY={2.0} scale={0.12} />
      <MiniSymbTendrils
        position={[-3.25, 0.87, 3.3]}
        rotationY={2.0}
        scale={0.12}
      />
      <Venom position={[-3.3, 0.87, 2.9]} rotationY={1.2} scale={0.1} />

      {/* Middle row */}
      <PizzaTime position={[-2.9, 0.85, 2.9]} rotationY={1.6} scale={0.1} />
      <MiniSpid position={[-2.9, 0.9, 3.3]} rotationY={2.0} scale={0.1} />
      <CityScene position={[-2.75, 0.873, 3.6]} rotationY={1.6} scale={0.01} />
      {/* Bottom row */}
      <Webshooter position={[-2.5, 0.9, 3.6]} rotationY={1.2} scale={0.06} />
      <SpidHead position={[-2.5, 0.88, 3.3]} rotationY={1.6} scale={0.1} />
      <MiniHand position={[-2.5, 0.9, 2.95]} rotationY={1.2} scale={0.2} />
    </>
  );
});

export default Workbench;
