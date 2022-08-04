import React from "react";
import { Box, Text, Textarea } from "@chakra-ui/react";

const Visit = (): React.ReactElement => {
  const [value, setValue] = React.useState("");
  const [length, setLength] = React.useState(0);
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
    if (event.target.value.toString().slice(-1).includes("#")) {
      // eslint-disable-next-line no-alert
      window.alert(event.target.value.toString().slice(length, -1));
      setLength(event.target.value.length);
    }
  };

  return (
    <Box style={{ textAlign: "center", padding: "20px" }}>
      <Text textStyle="header-large">Visit 📝</Text>

      <Textarea
        style={{ margin: "10px" }}
        size="lg"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Visit;
