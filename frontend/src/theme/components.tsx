import type { ComponentStyleConfig } from "@chakra-ui/theme";
import textStyles from "./textStyles";
// TODO: thoughts on separating out each component into different files?

// Button styling
export const Button: ComponentStyleConfig = {
  baseStyle: {
    textTransform: "uppercase",
    borderRadius: "none",
  },
  variants: {
    solid: {
      background: "#000000",
      color: "white",
      opacity: "0.5",
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: "600",
      border: "none",
      padding: "21px 118px",
      _hover: {
        background: "gray.800",
      },
    },
  },
  defaultProps: {
    variant: "solid",
  },
};

export const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    paddingTop: "15px",
  },
  variants: {
    formLabel: textStyles.formLabel,
  },
  defaultProps: {
    variant: "formLabel",
  },
};

export const Input: ComponentStyleConfig = {
  variants: {
    solid: {
      field: {
        background: "#EEECF2",
        borderRadius: "0px",
        _placeholder: {
          color: "#888897",
          padding: "10px 0px",
        },
      },
    },
  },
  defaultProps: {
    variant: "solid",
  },
};
