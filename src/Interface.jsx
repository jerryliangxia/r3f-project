import { useState } from "react";
import { Card, Text, Button } from "@radix-ui/themes";

export default function Interface({ setShowDiv }) {
  return (
    <Card
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Button onClick={() => setShowDiv(false)}>
        <Text>Close</Text>
      </Button>
    </Card>
  );
}
