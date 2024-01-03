import { forwardRef, useState, useEffect } from "react";
import { useMatcapTexture, Center, Text3D } from "@react-three/drei";
import WorkbenchGrid from "./WorkBenchGrid";

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
      <WorkbenchGrid
        centerPosition={[-2.9, 0.9, 3.25]}
        offset={0.4}
        rotationY={1.2}
        scale={0.13}
        isActualWorkbenchClicked={props.isActualWorkbenchClicked}
        setHtmlComponent={props.setHtmlComponent}
        setShowDiv={props.setShowDiv}
      />
    </>
  );
});

export default Workbench;
