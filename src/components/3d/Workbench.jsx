import { useRef, forwardRef, useState, useEffect, useMemo } from "react";
import { useMatcapTexture, shaderMaterial } from "@react-three/drei";
import WorkbenchGrid from "./WorkBenchGrid";
// import RectAreaLightModels from "./RectAreaLightModels";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Crate from "./Crate";
import gsap from "gsap";

const RippleShaderMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  `varying vec2 vUv;
  
  void main()
  {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
  }`,
  // Fragment Shader
  `uniform float uTime;
  varying vec2 vUv;
  
  void main()
  {
      // float strength1 = abs(distance(vUv, vec2(0.5)) - (0.5 * abs(cos(uTime))));
      // float strength = strength1 * (0.5 - distance(vUv, vec2(0.5)));
      // gl_FragColor = vec4(strength, strength, strength, 1.0);
      // Modulo operation to limit the range of uTime to half the cycle
      float modTime = mod(uTime, 1.8); // PI is approximately 3.14159
      float strength1 = abs(distance(vUv, vec2(0.5)) - (0.5 * abs(sin(modTime))));
      float strength = strength1 * (0.5 - distance(vUv, vec2(0.5)));
      gl_FragColor = vec4(strength, strength, strength, 1.0);
  }`
);

// Extend will make the shader material available as a JSX element
extend({ RippleShaderMaterial });

function RippleEffect() {
  const shaderRef = useRef();
  const { clock } = useThree();

  useFrame(() => {
    // Update the time uniform to animate the ripple
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh>
      <planeGeometry args={[5, 5]} />
      <rippleShaderMaterial ref={shaderRef} />
    </mesh>
  );
}

const Workbench = forwardRef((props, ref) => {
  const lightRef = useRef();

  const [showHtml, setShowHtml] = useState(false);
  const [matcapTexture] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256);

  const workbenchGridRef = useRef();
  const meshRef = useRef();

  const simpleShadow = useLoader(
    THREE.TextureLoader,
    "./images/scene/simpleShadow.jpg"
  );

  useEffect(() => {
    // Define the animation parameters
    const targetY = props.isActualWorkbenchClicked ? -0.18 : -0.4; // Adjust these values as needed
    const duration = 0.5; // Duration of the animation in seconds

    // Animate the workbench grid
    gsap.to(workbenchGridRef.current.position, {
      y: targetY,
      duration: duration,
    });

    // Animate the mesh
    gsap.to(meshRef.current.position, {
      y: targetY + 0.85,
      duration: duration,
    });
  }, [props.isActualWorkbenchClicked, props.isWorkbenchClicked]);

  useEffect(() => {
    let timeoutId;
    if (props.isWorkbenchClicked) {
      props.setIsActualWorkbenchClicked(true);
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
  }, [props.isWorkbenchClicked, props.isActualWorkbenchClicked]);

  return (
    <>
      <Crate
        ref={ref}
        {...props}
        scale={0.5}
        position={props.position.map(
          (value, index) => value + [0, -0.41, 0][index]
        )}
        isActualWorkbenchClicked={props.isActualWorkbenchClicked}
      />
      {/* <mesh
        ref={lightRef}
        rotation-x={-Math.PI * 0.5}
        position={props.position.map(
          (value, index) => value + [0, -0.85, 0][index]
        )}
      >
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial
          color={"yellow"}
          transparent
          alphaMap={simpleShadow}
        />
      </mesh> */}
      {/* <RippleEffect /> */}
      <rectAreaLight
        position={props.position.map(
          (value, index) => value + [0, 1.2, -0.8][index]
        )}
        rotation={[-Math.PI, 0, 0]}
        width={2.0}
        height={2.0}
        intensity={3.0}
        color="pink"
      />
      <WorkbenchGrid
        ref={workbenchGridRef}
        meshRef={meshRef}
        centerPosition={props.position.map(
          (value, index) => value + [0, 0.28, -0.02][index]
        )}
        offset={0.4}
        rotationY={1.2 + props.rotationY}
        scale={0.13}
        isActualWorkbenchClicked={props.isActualWorkbenchClicked}
        setHtmlComponent={props.setHtmlComponent}
        setShowDiv={props.setShowDiv}
      />
    </>
  );
});

export default Workbench;
