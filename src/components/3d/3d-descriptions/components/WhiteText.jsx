import { Text } from "@radix-ui/themes";

export function WhiteText({
  children,
  color = "white",
  size,
  style,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <Text
      color={color}
      size={size}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Text>
  );
}
