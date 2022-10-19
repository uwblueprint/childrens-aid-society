import type { ComponentStyleConfig } from "@chakra-ui/theme";

// Selection-Container styling
const Container: ComponentStyleConfig = {
  sizes: {
    md: {
      fontSize: "md",
    },
    lg: {
      fontSize: "lg",
    },
  },
  variants: {
    selectionTag: {
      maxW: "md",
      borderRadius: "8px",
      padding: "4px",
      background: "gray.100",
      display: "flex",
      justifyContent: "flex-start",
      _hover: {
        background: "gray.300",
      },
      _pressed: {
        background: "gray.500",
      },
    },
  },
  defaultProps: {
    variant: "default",
    size: "lg",
  },
};

export default Container;
