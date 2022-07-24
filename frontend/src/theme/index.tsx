import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

import colors from "./colors";
import textStyles from "./textStyles";
import { Button, FormLabel, Input } from "./components";

const customTheme = extendTheme({
  styles: {
    global: (props: { colorMode: string; theme: Dict }) => ({
      "html, body": props.theme.textStyles["body-regular"],
    }),
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  fonts: {
    heading: `'Eczar', serif`,
    body: `'Work Sans', sans-serif`,
  },
  colors,
  textStyles,
  components: {
    Button,
    FormLabel,
    Input,
  },
});

export default customTheme;
