/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState, useEffect, forwardRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";

const Crate = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/crate.glb");
  const { actions } = useAnimations(animations, group);

  const [enabled, setHoverEnabled] = useState(false);
  let timeoutId = null;

  const handlePointerOver = (event) => {
    event.stopPropagation();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    document.body.style.cursor = "pointer";
    setHoverEnabled(true);
  };

  const handlePointerOut = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      document.body.style.cursor = "default";
      setHoverEnabled(false);
    }, 10); // delay in milliseconds
  };

  useEffect(() => {
    if (props.isActualWorkbenchClicked) {
      const action = actions["Opened"];
      action.reset().fadeIn(0.5).play();
      return () => {
        action.fadeOut(0.5);
      };
    } else {
      const action = actions["Closed"];
      action.reset().fadeIn(0.5).play();
      return () => {
        action.fadeOut(0.5);
      };
    }
  }, [props.isActualWorkbenchClicked]);

  return (
    <>
      <Select enabled={enabled && !props.isActualWorkbenchClicked}>
        {/* Mesh to be looked at */}
        <mesh
          ref={ref}
          position={props.position.map(
            (value, index) => value + [0, 0.8, 0][index]
          )}
          visible={false}
        >
          <boxGeometry args={[0.1, 0.5, 0.1]} />
        </mesh>
        <group
          ref={group}
          {...props}
          dispose={null}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={(event) => {
            if (!props.isComputerClicked && !props.isWorkbenchClicked) {
              console.log(ref);
              console.log(event.object.position);
              event.stopPropagation();
              props.handleMajorMeshClick(
                true,
                1.0,
                5.0,
                ref.current.position,
                ref.current,
                2.0
              );
            }
          }}
        >
          <group name="Scene">
            <group name="Box1">
              <mesh
                name="Box1_1"
                geometry={nodes.Box1_1.geometry}
                material={materials["Dark Green"]}
              />
              <mesh
                name="Box1_2"
                geometry={nodes.Box1_2.geometry}
                material={materials["Yellow Glow"]}
              />
              <mesh
                name="Box1_3"
                geometry={nodes.Box1_3.geometry}
                material={materials.Black}
              />
              <mesh
                name="Box1_4"
                geometry={nodes.Box1_4.geometry}
                material={materials["Dark Gray"]}
              />
            </group>
            <group name="Box2">
              <mesh
                name="Box2_1"
                geometry={nodes.Box2_1.geometry}
                material={materials["Dark Green"]}
              />
              <mesh
                name="Box2_2"
                geometry={nodes.Box2_2.geometry}
                material={materials["Yellow Glow"]}
              />
              <mesh
                name="Box2_3"
                geometry={nodes.Box2_3.geometry}
                material={materials.Black}
              />
              <mesh
                name="Box2_4"
                geometry={nodes.Box2_4.geometry}
                material={materials["Dark Gray"]}
              />
            </group>
          </group>
        </group>
      </Select>
    </>
  );
});

useGLTF.preload("/crate.glb");

export default Crate;
