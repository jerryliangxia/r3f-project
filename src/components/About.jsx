import { Card, Button, Text } from "@radix-ui/themes";

export default function About({ setShowDiv }) {
  return (
    <div>
      <Button onClick={() => setShowDiv(false)}>
        <Text>Close</Text>
      </Button>
    </div>
  );
}
