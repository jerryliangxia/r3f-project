import { Card, Button, Text } from "@radix-ui/themes";

export default function About({ setShowDiv }) {
  return (
    <Card
      radius="none"
      style={{
        width: "100vw",
        height: "100vh",
      }}
      color="black"
    >
      About!!!
      <Button onClick={() => setShowDiv(false)}>
        <Text>Close</Text>
      </Button>
    </Card>
  );
}
