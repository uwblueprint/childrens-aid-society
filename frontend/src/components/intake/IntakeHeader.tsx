import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export type IntakeHeaderText = {
  primaryTitle: string;
  secondaryTitle: string;
};

export type IntakeHeaderProps = {
  intakeHeaderText: IntakeHeaderText;
};

const IntakeHeader = ({
  intakeHeaderText,
}: IntakeHeaderProps): React.ReactElement => {
  return (
    <Box bg="gray.50" style={{ padding: "50px 100px 25px 100px" }}>
      <Text textStyle="title-small">{intakeHeaderText.secondaryTitle}</Text>
      <Heading textStyle="display-medium">
        {intakeHeaderText.primaryTitle}
      </Heading>
    </Box>
  );
};

export default IntakeHeader;
