import { cloneElement } from "react";
import { Button, Text, Flex } from "@radix-ui/themes";

export default function Interface({ htmlComponent, setShowDiv }) {
  return (
    <div
      className="example"
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "10vh",
        left: "10vw",
        width: "80vw",
        height: "80vh",
        overflow: "auto",
        backgroundColor: setShowDiv ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0)", // optional: semi-transparent background
        pointerEvents: setShowDiv ? "" : "none",
      }}
    >
      <div
        style={{
          width: "70%",
          marginTop: "5vh",
          marginBottom: "5vh",
        }}
      >
        <Flex gap="6" direction="column" align="left">
          {cloneElement(htmlComponent, { setShowDiv })}
          <div></div>
        </Flex>
      </div>
    </div>
  );
}
