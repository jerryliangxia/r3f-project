import { Html } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";

const Computer = forwardRef((props, ref) => {
  const [showHtml, setShowHtml] = useState(false);

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
    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [props.isComputerClicked, props.isActualComputerClicked]);

  return (
    <>
      <mesh
        ref={ref}
        {...props}
        position={[3.15, 0.65, -3.07]}
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
            position={[-0.3, 0.75, 0]}
            rotation-x={-0.256}
          >
            <iframe src="https://jerryxia.com/blog/" />
          </Html>
        )}
        {/*
        <rectAreaLight
          width={2.5}
          height={1.65}
          intensity={65}
          color={"#ff6900"}
          rotation={[-0.1, Math.PI, 0]}
          position={[0, 0.55, -1.15]}
        /> */}
        <boxGeometry args={[1.1, 0.5, 1.1]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
    </>
  );
});

export default Computer;
