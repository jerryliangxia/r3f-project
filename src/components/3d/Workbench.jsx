import { forwardRef } from "react";
const Workbench = forwardRef((props, ref) => {
  return (
    <>
      <mesh
        ref={ref}
        {...props}
        position={[-3, 1, 3]}
        onPointerEnter={() => {
          document.body.style.cursor = props.isComputerClicked
            ? "default"
            : "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[1.0, 0.5, 1.0]} />
        <meshStandardMaterial color="#9d4a4a" />
      </mesh>
    </>
  );
});

export default Workbench;
