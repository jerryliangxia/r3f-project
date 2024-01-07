import { Html, useGLTF } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

const Computer = forwardRef((props, ref) => {
  const [showHtml, setShowHtml] = useState(false);
  const [showBasedOnRotation, setShowBasedOnRotation] = useState(false);

  useFrame((state) => {
    setShowBasedOnRotation(state.camera.position.z > props.position[2]);
  });

  useEffect(() => {
    let timeoutId;
    if (props.isComputerClicked) {
      timeoutId = setTimeout(() => {
        setShowHtml(true);
      }, 100);
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

  const scale = 0.5;
  return (
    <>
      {/* Mesh that will be looked at */}
      <mesh
        ref={ref}
        {...props}
        position={props.position.map(
          (value, index) => value + [0.031, 0.913, 0.0][index]
        )}
        // rotation={[0, -Math.PI / 4, 0]}
        visible={false}
      >
        <boxGeometry args={[0.5 * scale, 0.33 * scale, 0.05 * scale]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
      {/* Mesh that can be clicked */}
      <mesh
        {...props}
        position={props.position.map(
          (value, index) => value + [0.0, 0.4, 0.0][index]
        )}
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
            position={[-0.305, 0.835, 0.015]}
            scale={1.05}
            // rotation-x={-0.256}
            style={{
              transition: "opacity 1s ease-in", // Add this line for CSS transition
              opacity: showBasedOnRotation ? 1 : 0,
            }}
          >
            <iframe src="https://r3f-blog.vercel.app/" />
          </Html>
        )}
        <boxGeometry args={[1.1, 0.7, 0.6]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
      {/* <Desk
        position={props.position.map(
          (value, index) => value + [0.02, 0.22, 0.22][index]
        )}
        scale={0.207}
      /> */}
    </>
  );
});

export default Computer;
