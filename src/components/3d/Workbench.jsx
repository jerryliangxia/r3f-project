import { Html, useGLTF } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import MiniSpid from "./MiniSpid";
import MiniSymb from "./MiniSymb";
import MiniSymbTendrils from "./MiniSymbTendrils";
import Venom from "./Venom";

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
      <MiniSpid position={[-3.25, 0.9, 3.6]} rotationY={2.0} />
      <MiniSymb position={[-3.25, 0.9, 3.3]} rotationY={2.0} />
      <MiniSymbTendrils position={[-3.25, 0.87, 3.3]} rotationY={2.0} />
      <Venom position={[-3.25, 0.87, 2.9]} rotationY={1.2} />
    </>
  );
});

export default Workbench;
