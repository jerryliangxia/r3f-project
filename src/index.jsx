import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Interface from "./Interface.jsx";
import React, { useState } from "react";

function App() {
  const [showDiv, setShowDiv] = useState(false);
  const [htmlComponent, setHtmlComponent] = useState(null);

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
            setHtmlComponent={setHtmlComponent}
            setShowDiv={setShowDiv}
          />
        </Canvas>
        {showDiv && (
          <Interface htmlComponent={htmlComponent} setShowDiv={setShowDiv} />
        )}
      </KeyboardControls>
    </Theme>
  );
}

// Create the root once
const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);

// Then call render on it as many times as you want
root.render(<App />);
