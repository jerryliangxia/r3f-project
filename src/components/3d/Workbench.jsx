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
  Select,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

// 3D Descriptions
import Symbiote from "./3d-descriptions/Symbiote";
import WebshooterDiv from "./3d-descriptions/Webshooter";
import VenomDiv from "./3d-descriptions/Venom";
import UnmaskedDiv from "./3d-descriptions/Unmasked";

const Workbench = forwardRef((props, ref) => {
  const [showHtml, setShowHtml] = useState(false);
  const [matcapTexture] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256);
  const hoverRef = useRef();
  const [hovered, hover] = useState([0, 0, 0, 0, 0, 0, 0]);

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
        <EffectComposer multisampling={1} autoClear={false}>
          <Outline visibleEdgeColor="pink" edgeStrength={1} width={900} />
        </EffectComposer>
        {/* Top row */}
        <Select enabled={hovered[0] == 1 && props.isActualWorkbenchClicked}>
          <MiniSymb
            position={[-3.25, 0.9, 3.3]}
            rotationY={2.0}
            scale={0.12}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 0: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 0: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              props.setHtmlComponent(<Symbiote />);
              props.setShowDiv(true);
            }}
          />
        </Select>
        <MiniSymbTendrils
          position={[-3.25, 0.87, 3.3]}
          rotationY={2.0}
          scale={0.12}
        />

        <Select enabled={hovered[1] == 1 && props.isActualWorkbenchClicked}>
          <Venom
            position={[-3.3, 0.87, 2.9]}
            rotationY={1.2}
            scale={0.1}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 1: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 1: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              props.setHtmlComponent(<VenomDiv />);
              props.setShowDiv(true);
            }}
          />
        </Select>

        {/* Middle Row */}
        <Select enabled={hovered[2] == 1 && props.isActualWorkbenchClicked}>
          <PizzaTime
            position={[-2.9, 0.85, 2.9]}
            rotationY={1.6}
            scale={0.1}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 2: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 2: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              props.setHtmlComponent(<UnmaskedDiv />);
              props.setShowDiv(true);
            }}
          />
        </Select>

        {/* Middle row */}
        <Select enabled={hovered[3] == 1 && props.isActualWorkbenchClicked}>
          <MiniSpid
            position={[-2.9, 0.9, 3.3]}
            rotationY={2.0}
            scale={0.1}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 3: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 3: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              console.log("Spider-Man");
            }}
          />
        </Select>

        <Select enabled={hovered[4] == 1 && props.isActualWorkbenchClicked}>
          <CityScene
            position={[-2.75, 0.873, 3.6]}
            rotationY={1.6}
            scale={0.01}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 4: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 4: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              console.log("City Scene");
            }}
          />
        </Select>

        {/* Bottom row */}
        <Select enabled={hovered[5] == 1 && props.isActualWorkbenchClicked}>
          <Webshooter
            position={[-2.5, 0.9, 3.6]}
            rotationY={1.2}
            scale={0.06}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 5: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 5: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              props.setHtmlComponent(<WebshooterDiv />);
              props.setShowDiv(true);
            }}
          />
        </Select>
        <Select enabled={hovered[6] == 1 && props.isActualWorkbenchClicked}>
          <SpidHead
            ref={hoverRef}
            position={[-2.5, 0.88, 3.3]}
            rotationY={1.6}
            scale={0.1}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 6: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 6: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              console.log("Spider-Man head");
            }}
          />
        </Select>

        <Select enabled={hovered[7] == 1 && props.isActualWorkbenchClicked}>
          <MiniHand
            ref={hoverRef}
            position={[-2.5, 0.9, 2.95]}
            rotationY={1.2}
            scale={0.2}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              hover((prevHover) => ({ ...prevHover, 7: 1 }));
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              hover((prevHover) => ({ ...prevHover, 7: 0 }));
            }}
            onClick={(event) => {
              event.stopPropagation();
              console.log("Hand");
            }}
          />
        </Select>
      </Selection>
    </>
  );
});

export default Workbench;
