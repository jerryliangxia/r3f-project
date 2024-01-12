import { Text, Theme } from "@radix-ui/themes";

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
      size={size}
      style={{ ...style, color: color }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      highContrast
    >
      {children}
    </Text>
  );
}
