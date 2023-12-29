import { Card, Button, Text } from "@radix-ui/themes";

export default function ThreeD({ setShowDiv }) {
  return (
    <Card
      radius="none"
      style={{
        width: "100vw",
        height: "100vh",
      }}
      color="black"
    >
      3D!!!
      <Button onClick={() => setShowDiv(false)}>
        <Text>Close</Text>
      </Button>
    </Card>
  );
}
