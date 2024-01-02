import { cloneElement } from "react";
import { Button, Text, Flex } from "@radix-ui/themes";

export default function Interface({ htmlComponent, setShowDiv }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "10vh",
        left: "10vh",
        width: "80vw",
        height: "80vh",
        backgroundColor: setShowDiv ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)", // optional: semi-transparent background
        pointerEvents: setShowDiv ? "" : "none",
      }}
    >
      <Flex gap="4" direction="column">
        {cloneElement(htmlComponent, { setShowDiv })}
        <Button onClick={() => setShowDiv(false)}>
          <Text>Close</Text>
        </Button>
      </Flex>
    </div>
  );
}
