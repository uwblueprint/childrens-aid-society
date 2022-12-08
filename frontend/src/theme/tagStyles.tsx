import type { ComponentStyleConfig } from "@chakra-ui/theme";

// Tag styling
const Tag: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {
    md: {
      fontSize: "md",
    },
    lg: {
      fontSize: "lg",
    },
  },
  variants: {
    default: {
      container: {
        color: "gray.700",
        background: "blue.50",
        borderWidth: "1px",
        borderColor: "gray.700",
        borderRadius: "4px",
        _placeholder: {
          color: "gray.600",
        },
        _hover: {
          background: "gray.100",
        },
        _focus: {
          background: "gray.100",
          border: "1px solid #5D5E67",
        },
        _invalid: {
          background: "red.50",
          border: "1px solid #FF5449",
        },
      },
    },
  },
  defaultProps: {
    variant: "default",
    size: "lg",
  },
};

export default Tag;
