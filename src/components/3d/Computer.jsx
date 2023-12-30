import { forwardRef } from "react";
const Computer = forwardRef((props, ref) => {
  return (
    <>
      <mesh
        ref={ref}
        {...props}
        position={[3, 1, -3.5]}
        onPointerEnter={() => {
          document.body.style.cursor = props.isComputerClicked
            ? "default"
            : "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
    </>
  );
});

export default Computer;
