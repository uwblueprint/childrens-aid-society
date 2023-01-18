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

// TODO: make the placeholder color "#888897 and selected input color black
export const Select: ComponentStyleConfig = {
  variants: {
    solid: {
      field: {
        height: "48px",
        backgroundColor: "gray.50",
        borderColor: "gray.100",
        borderWidth: "1px",
        fontSize: "18px",
        _hover: {
          backgroundColor: "gray.100",
        },
        _focus: {
          backgroundColor: "gray.100",
          borderColor: "#5D5E67",
        },
      },
    },
  },
  defaultProps: {
    variant: "solid",
  },
};
