import type { ComponentStyleConfig } from "@chakra-ui/theme";

// Button styling
export const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    textTransform: "uppercase",
    borderRadius: "none",
  },
  variants: {
    solid: {
      bg: "#000000",
      color: "white",
      opacity: "0.5",
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: "600",
      border: "none",
      pt: "21px",
      pb: "21px",
      pl: "118px",
      pr: "118px",
      _hover: {
        bg: "gray.800",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    variant: "solid",
  },
};

export const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: "Roboto",
    fontSize: "17px",
    fontWeight: "600",
    lineHeight: "16px",
    color: "#242426",
    mt: "28px"
  },
};

export const Heading: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: "Roboto",
    fontSize: "46px",
    fontWeight: "700",
    lineHeight: "36px",
    textAlign: "center",
    p: "40px",
  },
};

export const Input: ComponentStyleConfig = {
  variants: {
    customVariant: {
      field: {
        bg: "#EEECF2",
        borderRadius: "0px",
        _placeholder: {
          color: "#888897",
          pt: "10px",
          pb: "10px",
        },
      },
    },
  },
  sizes: {},
  defaultProps: {
    variant: "customVariant",
  },
};
