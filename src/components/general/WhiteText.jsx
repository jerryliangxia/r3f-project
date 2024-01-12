import { Text } from "@radix-ui/themes";

export function WhiteText({
  children,
  color = "white",
  size = 1,
  style,
  onMouseEnter,
  onMouseLeave,
}) {
  const isMobile = window.innerWidth <= 768;

  return (
    <Text
      size={isMobile ? 1 : size}
      style={{ ...style, color: color }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      highContrast
    >
      {children}
    </Text>
  );
}
