import { Box } from "@chakra-ui/react";
import React from "react";

const OptionalLabel = (): React.ReactElement => {
  return (
    <Box as="span" color="gray.600">
      (OPTIONAL)
    </Box>
  );
};

export default OptionalLabel;
