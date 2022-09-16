import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export type IntakeHeaderProps = {
  primaryTitle: string;
  secondaryTitle: string;
};

const IntakeHeader = ({
  primaryTitle,
  secondaryTitle,
}: IntakeHeaderProps): React.ReactElement => {
  return (
    <Box bg="gray.50" style={{ padding: "50px 100px 25px 100px" }}>
      <Text color="gray.600" textStyle="title-small">
        {secondaryTitle}
      </Text>
      <Heading textStyle="display-medium">{primaryTitle}</Heading>
    </Box>
  );
};

export default IntakeHeader;
