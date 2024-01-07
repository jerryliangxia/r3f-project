/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Crate(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/crate.glb");
  const { actions } = useAnimations(animations, group);

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
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Box1"
          geometry={nodes.Box1.geometry}
          material={materials["Dark Blue"]}
          scale={[1.263, 0.839, 1.115]}
        />
        <mesh
          name="Box2"
          geometry={nodes.Box2.geometry}
          material={materials["Dark Blue"]}
          scale={[1.263, 0.839, 1.115]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/crate.glb");