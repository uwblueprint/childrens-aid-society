import type { ComponentStyleConfig } from "@chakra-ui/theme";
import textStyles from "./textStyles";
// TODO: separate out each component into different files

// Button styling
export const Button: ComponentStyleConfig = {
  baseStyle: {
    textTransform: "uppercase",
    borderRadius: "none",
    width: "30%",
    margin: "10px",
  },
  variants: {
    solid: {
      _hover: {
        background: "gray.800",
      },
      background: "#000000",
      border: "none",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "16px",
      opacity: "0.5",
      padding: "21px 118px",
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

// TODO: make the placeholder color "#888897 and selected input color black
export const Select: ComponentStyleConfig = {
  variants: {
    solid: {
      field: {
        background: "#EEECF2",
        borderRadius: "0px",
        color: "#888897",
      },
    },
  },
  defaultProps: {
    variant: "solid",
  },
};
