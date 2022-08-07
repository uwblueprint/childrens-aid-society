import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

import colors from "./colors";
import textStyles from "./textStyles";
import { FormLabel, Select } from "./components";
import Button from "./buttonStyles";
import Input from "./inputStyles";

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
    Select,
  },
});

export default customTheme;
