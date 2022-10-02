import type { ComponentStyleConfig } from "@chakra-ui/theme";

// Button styling
const Button: ComponentStyleConfig = {
  baseStyle: {
    color: "white.default",
    width: "auto",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      padding: "8px 12px",
      borderRadius: "6px",
    },
    md: {
      fontSize: "md",
      padding: "12px 16px",
      borderRadius: "8px",
    },
  },
  variants: {
    primary: {
      background: "blue.400",
      boxShadow:
        "inset 0px 0px 18px rgba(143, 167, 255, 0.15), inset 0px 0px 32px rgba(53, 87, 188, 0.5)",
      _hover: {
        background: "blue.500",
        boxShadow:
          "0px 0px 32px rgba(143, 167, 255, 0.1), 0px 0px 16px rgba(0, 40, 125, 0.2)",
      },
      _active: {
        background: "blue.500",
        boxShadow:
          "0px 0px 32px rgba(143, 167, 255, 0.1), 0px 0px 16px rgba(0, 40, 125, 0.2), inset 0px 0px 32px rgba(220, 225, 255, 0.5)",
      },
      _disabled: {
        opacity: "0.5",
        pointerEvents: "none",
      },
    },
    secondary: {
      background: "blue.50",
      border: "1px solid #00287D",
      borderRadius: "8px",
      color: "blue.400",
      _hover: {
        background: "blue.100",
      },
      _active: {
        background: "#DCE1FF",
        boxShadow: "box-shadow: inset 0px 0px 32px rgba(0, 40, 125, 0.2)",
      },
      _disabled: {
        opacity: "0.5",
        pointerEvents: "none",
      },
    },
    tertiary: {
      color: "blue.400",
      _hover: {
        color: "blue.300",
      },
      _active: {
        color: "blue.500",
      },
      _disabled: {
        color: "blue.400",
        pointerEvents: "none",
      },
    },
  },
  defaultProps: {
    variant: "primary",
    size: "md",
  },
};

export default Button;
