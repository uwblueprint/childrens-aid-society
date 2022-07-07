import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

import colors from "./colors";
import textStyles from "./textStyles";

const customTheme = extendTheme({
  styles: {
    global: (props: { colorMode: string; theme: Dict }) => ({
      "html, body": props.theme.textStyles["body-regular"],
    }),
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  colors,
  textStyles,
});

export default customTheme;
