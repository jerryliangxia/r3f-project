import { useRef, forwardRef, useState, useEffect } from "react";
import WorkbenchGrid from "./WorkBenchGrid";
import Crate from "./Crate";
import gsap from "gsap";

const Workbench = forwardRef((props, ref) => {
  const [showHtml, setShowHtml] = useState(false);
  const workbenchGridRef = useRef();
  const meshRef = useRef();

  useEffect(() => {
    const targetY = props.isActualWorkbenchClicked ? -0.18 : -0.4;
    const duration = 0.5;

    gsap.to(workbenchGridRef.current.position, {
      y: targetY,
      duration: duration,
    });

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
      />
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
