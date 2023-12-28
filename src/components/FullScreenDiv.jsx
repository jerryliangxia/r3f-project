import { useState } from "react";
import { Html } from "@react-three/drei";

export default function FullScreenDiv({ showDiv, setShowDiv }) {
  return (
    <Html>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)",
          opacity: showDiv ? 1 : 0,
          transition: "opacity 0.5s",
          pointerEvents: showDiv ? "auto" : "none",
        }}
      >
        <button onClick={() => setShowDiv(false)}>Close</button>
        {/* Your content */}
      </div>
    </Html>
  );
}
