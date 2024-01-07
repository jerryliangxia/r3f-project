import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls, Loader } from "@react-three/drei";
import "@radix-ui/themes/styles.css";
import { Theme, Button, Card, Text } from "@radix-ui/themes";
import Interface from "./Interface.jsx";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

function App() {
  const [showDiv, setShowDiv] = useState(false);
  const [showButtonDiv, setShowButtonDiv] = useState(false);
  const [htmlComponent, setHtmlComponent] = useState(null);
  const [isComputerClicked, setIsComputerClicked] = useState(false);
  const [isActualComputerClicked, setIsActualComputerClicked] = useState(false);
  const [isActualWorkbenchClicked, setIsActualWorkbenchClicked] =
    useState(false);
  const cameraControlsRef = useRef();
  const [minDistance, setMinDistance] = useState(5.0);
  const [maxDistance, setMaxDistance] = useState(7.8);
  const [loadingOpaque, setLoadingOpaque] = useState(true);

  const Reset = () => {
    setShowDiv(false);
    setShowButtonDiv(false);
    setMinDistance(5.0);
    setMaxDistance(7.8);
    setIsComputerClicked(false);
    cameraControlsRef.current.reset(true);
  };

  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
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
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
          }}
        >
          <motion.div
            initial="visible"
            animate={loadingOpaque ? "hidden" : "visible"}
            variants={overlayVariants}
            transition={{ duration: 1.5 }} // Customize the transition as needed
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />
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
            <fog attach="fog" args={["#181818", 0, 130]} />
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
        </div>

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
