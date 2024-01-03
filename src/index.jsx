import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls, Loader } from "@react-three/drei";
import "@radix-ui/themes/styles.css";
import { Theme, Button, Card, Text } from "@radix-ui/themes";
import Interface from "./Interface.jsx";
import React, { useState, useRef } from "react";

function App() {
  const [showDiv, setShowDiv] = useState(false);
  const [showButtonDiv, setShowButtonDiv] = useState(false);
  const [htmlComponent, setHtmlComponent] = useState(null);
  const [isComputerClicked, setIsComputerClicked] = useState(false);
  const [isActualComputerClicked, setIsActualComputerClicked] = useState(false);
  const [isActualWorkbenchClicked, setIsActualWorkbenchClicked] =
    useState(false);
  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(6.0);
  const [maxDistance, setMaxDistance] = useState(10.0);
  const [loadingOpaque, setLoadingOpaque] = useState(true);

  const Reset = () => {
    setShowDiv(false);
    setShowButtonDiv(false);
    setMinDistance(6.0);
    setMaxDistance(10.0);
    setIsComputerClicked(false);
    cameraControlsRef.current.reset(true);
  };

  return (
    <Theme>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
          style={{ position: "fixed" }}
        >
          <Experience
            cameraControlsRef={cameraControlsRef}
            setHtmlComponent={setHtmlComponent}
            setShowDiv={setShowDiv}
            showButtonDiv={showButtonDiv}
            setShowButtonDiv={setShowButtonDiv}
            isComputerClicked={isComputerClicked}
            setIsComputerClicked={setIsComputerClicked}
            isActualComputerClicked={isActualComputerClicked}
            setIsActualComputerClicked={setIsActualComputerClicked}
            isActualWorkbenchClicked={isActualWorkbenchClicked}
            setIsActualWorkbenchClicked={setIsActualWorkbenchClicked}
            minDistance={minDistance}
            setMinDistance={setMinDistance}
            maxDistance={maxDistance}
            setMaxDistance={setMaxDistance}
          />
        </Canvas>
        <Loader
          className="loader-container"
          containerStyles={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to right, #1D1C40, #10001C)",
            transition: "opacity 0.5ss ease-in-out",
            opacity: loadingOpaque ? 1.0 : 0.0,
          }}
          dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
          initialState={(active) => {
            if (!active) {
              setTimeout(() => {
                setLoadingOpaque(false);
              }, 20);
            }
            return active;
          }}
        />
        {showDiv && (
          <Interface htmlComponent={htmlComponent} setShowDiv={setShowDiv} />
        )}
        <div
          style={{
            position: "absolute",
            top: "95vh",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
          onPointerEnter={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "default";
          }}
        >
          <Button
            style={{
              position: "absolute",
              bottom: showButtonDiv ? 0 : "-120px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
              transition: "bottom 0.5s ease-in-out, opacity 0.5s ease-in-out",
              opacity: showButtonDiv ? 1 : 0,
            }}
            onClick={() => {
              showDiv ? setShowDiv(false) : Reset();
            }}
          >
            {showDiv ? <>Back</> : <>Normal View</>}
          </Button>
        </div>
      </KeyboardControls>
    </Theme>
  );
}

const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
