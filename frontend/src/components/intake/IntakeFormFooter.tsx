import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

export type IntakeFooterProps = {
};

const IntakeFooter = (

 ): React.ReactElement => {
  return (
    <Box bg="gray.50" h="90px">
      <Button type="submit" ml= "1200px" mt="25px">Next Section</Button>
      <Button variant="tertiary" ml= "1050px" mt="-65px">Clear page</Button>
    </Box>
  );
};


export default IntakeFooter;
