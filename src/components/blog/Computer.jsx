import { Html, useGLTF } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import Desk from "./Desk";

const Computer = forwardRef((props, ref) => {
  const { positionX, positionY, positionZ, deskScale } = useControls("desk", {
    positionX: {
      value: 3.17,
      step: 0.1,
    },
    positionY: {
      value: 0.15,
      step: 0.1,
    },
    positionZ: {
      value: -2.85,
      step: 0.1,
    },
    deskScale: { value: 0.207 },
  });

  const [showHtml, setShowHtml] = useState(false);
  const [showBasedOnRotation, setShowBasedOnRotation] = useState(false);

  useFrame((state) => {
    setShowBasedOnRotation(
      state.camera.position.z > -3.07 && state.camera.position.y < 3
    );
  });

  useEffect(() => {
    let timeoutId;
    if (props.isComputerClicked) {
      timeoutId = setTimeout(() => {
        setShowHtml(true);
      }, 1000);
    } else {
      setShowHtml(false);
      props.setIsActualComputerClicked(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [props.isComputerClicked, props.isActualComputerClicked]);

  return (
    <>
      {/* Mesh that will be looked at */}
      <mesh
        ref={ref}
        {...props}
        position={[3.15, 0.99, -3.07]}
        // rotation={[0, -Math.PI / 4, 0]}
        visible={false}
      >
        <boxGeometry args={[1.1, 0.5, 1.1]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
      {/* Mesh that can be clicked */}
      <mesh
        {...props}
        position={[3.15, 0.66, -3.07]}
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
        {showHtml && props.isActualComputerClicked && (
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={0.25}
            position={[-0.305, 0.515, 0]}
            scale={1.02}
            // rotation-x={-0.256}
            style={{ opacity: showBasedOnRotation ? 1 : 0 }}
          >
            <iframe src="https://r3f-blog.vercel.app/" />
          </Html>
        )}
        <boxGeometry args={[0.55, 0.5, 1.1]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
      <Desk position={[positionX, positionY, positionZ]} scale={deskScale} />
    </>
  );
});

export default Computer;
