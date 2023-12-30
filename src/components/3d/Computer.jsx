import { Html, useGLTF } from "@react-three/drei";
import { forwardRef, useState, useEffect } from "react";
import { useControls } from "leva";

const Computer = forwardRef((props, ref) => {
  const { position } = useControls("Computer", {
    position: {
      value: [3.17, 0.78, -2.78],
      step: 0.01,
    },
  });

  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
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
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [props.isComputerClicked, props.isActualComputerClicked]);

  return (
    <>
      <primitive position={position} scale={0.207} object={computer.scene} />
      <mesh
        ref={ref}
        {...props}
        position={[3.15, 0.66, -3.12]}
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
            position={[-0.3, 0.65, 0]}
            rotation-x={-0.256}
          >
            <iframe src="https://r3f-blog.vercel.app/" />
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
