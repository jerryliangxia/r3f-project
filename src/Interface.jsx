import { useState } from "react";
import { Card, Text, Button } from "@radix-ui/themes";

export default function Interface({ htmlComponent, setShowDiv }) {
  return (
    <Card
      radius="none"
      style={{
        width: "100vw",
        height: "100vh",
      }}
      color="black"
    >
      {htmlComponent}
      <Button onClick={() => setShowDiv(false)}>
        <Text>Close</Text>
      </Button>
    </Card>
  );
}
