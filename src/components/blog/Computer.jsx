import { Html } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Desk from "./Desk";

const Computer = forwardRef((props, ref) => {
  const [meshFirstRendered, setMeshFirstRendered] = useState(false);
  const [showHtml, setShowHtml] = useState(false);
  const [showBasedOnRotation, setShowBasedOnRotation] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useFrame((state) => {
    setShowBasedOnRotation(state.camera.position.z > props.position[2]);
  });

  useEffect(() => {
    let timeoutId;
    if (props.isComputerClicked) {
      timeoutId = setTimeout(() => {
        if (!meshFirstRendered) setMeshFirstRendered(true);
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
  }, [props.isActualComputerClicked]);

  return (
    <>
      {/* Mesh that can be clicked */}
      <Desk
        ref={ref}
        {...props}
        position={props.position.map(
          (value, index) => value + [0.01, 0.01, 0.03][index]
        )}
      />
      {/* HTML */}
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
        {meshFirstRendered &&
          (isMobile ? (
            <Html center scale={0.5} position={[0, 0.6, 0]}>
              <iframe
                src="https://r3f-blog.vercel.app/"
                style={{
                  pointerEvents: showHtml ? "auto" : "none",
                  transition:
                    "transform 0.5s ease-in-out, filter 0.25s ease-out",
                  opacity: meshFirstRendered && showHtml ? 1 : 0,
                  height: "80vh",
                  width: "80vw",
                  border: "none",
                  borderRadius: "20px",
                  transform: `scale(${showHtml ? 1 : 0.1})`,
                }}
              />
            </Html>
          ) : (
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={0.25}
              position={[-0.305, 0.835, 0.015]}
              scale={1.05}
              style={{
                pointerEvents: showHtml ? "auto" : "none",
                transition: "opacity 0.5s ease-in",
                opacity:
                  meshFirstRendered && showHtml && showBasedOnRotation ? 1 : 0,
              }}
            >
              <iframe src="https://r3f-blog.vercel.app/" />
            </Html>
          ))}
        <boxGeometry args={[1.1, 0.7, 0.6]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
    </>
  );
});

export default Computer;
