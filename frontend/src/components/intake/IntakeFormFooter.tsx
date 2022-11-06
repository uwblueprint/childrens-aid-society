import React from "react";
import { Box, Button } from "@chakra-ui/react";

export type IntakeFooterProps = Record<string, never>;

const IntakeFooter = (): React.ReactElement => {
  return (
    <Box bg="gray.50" h="90px">
      <Button type="submit" ml="1200px" mt="25px">
        Next Section
      </Button>
      <Button variant="tertiary" ml="1050px" mt="-65px">
        Clear page
      </Button>
    </Box>
  );
};

export default IntakeFooter;
