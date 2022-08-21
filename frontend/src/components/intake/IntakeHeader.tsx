import React from "react";
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

export type IntakeHeaderText = {
  biggerMainTitle: string;
  smallerTopTitle: string;
};

export type IntakeHeaderProps = {
  intakeHeaderText: IntakeHeaderText;
};

const IntakeHeader = ({
  intakeHeaderText,
}: IntakeHeaderProps): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };
  
  return (
    <Box bg='gray.50' style={{ padding: "50px 100px 25px 100px" }}>
      <Text textStyle="body-medium">{intakeHeaderText.smallerTopTitle}</Text>
      <Heading textStyle="header-large">{intakeHeaderText.biggerMainTitle}</Heading>
    </Box>
  );
    
};

export default IntakeHeader;
