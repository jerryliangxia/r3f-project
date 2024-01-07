import { forwardRef, useState, useEffect } from "react";
import { useMatcapTexture, Center, Text3D } from "@react-three/drei";
import WorkbenchGrid from "./WorkBenchGrid";
import RectAreaLightModels from "./RectAreaLightModels";
import Sketchfab from "./Sketchfab";

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
      <Center
        position={props.position.map(
          (value, index) => value + [0, 1.0, -1.0][index]
        )}
        rotation={[0, Math.PI / 2 + props.rotationY, 0.0]}
      >
        <Sketchfab scale={0.2} />
      </Center>
      <rectAreaLight
        position={props.position.map(
          (value, index) => value + [0, 1.2, -0.8][index]
        )}
        rotation={[-Math.PI, 0, 0]}
        width={2.0}
        height={2.0}
        intensity={3.0}
        color="pink"
      />
      <mesh
        ref={ref}
        {...props}
        position={props.position}
        onPointerEnter={() => {
          document.body.style.cursor = props.isComputerClicked
            ? "default"
            : "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        // visible={false}
      >
        <boxGeometry args={[1.1, 0.5, 1.1]} />
        {/* <meshStandardMaterial color="#9d4a4a" /> */}
        <meshStandardMaterial color="white" />
      </mesh>
      <WorkbenchGrid
        centerPosition={props.position.map(
          (value, index) => value + [0, 0.28, -0.02][index]
        )}
        offset={0.4}
        rotationY={1.2 + props.rotationY}
        scale={0.13}
        isActualWorkbenchClicked={props.isActualWorkbenchClicked}
        setHtmlComponent={props.setHtmlComponent}
        setShowDiv={props.setShowDiv}
      />
    </>
  );
});

export default Workbench;
