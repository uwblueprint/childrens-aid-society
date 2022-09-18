import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

import colors from "./colors";
import textStyles from "./textStyles";
import space from "./spacing";
import Button from "./buttonStyles";
import Input from "./inputStyles";
import breakpoints from "./breakpoints";
import { FormLabel, Select } from "./components";

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
  space,
  breakpoints,
  components: {
    Button,
    FormLabel,
    Input,
    Select,
  },
});

export default customTheme;
