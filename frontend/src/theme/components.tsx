import type { ComponentStyleConfig } from "@chakra-ui/theme";
import textStyles from "./textStyles";
// TODO: separate out each component into different files

export const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    paddingTop: "15px",
  },
  variants: {
    formLabel: textStyles.label,
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
