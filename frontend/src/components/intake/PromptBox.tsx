import React, { ReactElement } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";

export type PromptBoxProps = {
  headerText: string;
  descriptionText: string;
  buttonText: string;
  buttonIcon: ReactElement;
  onButtonClick: () => void;
};

const PromptBox = ({
  headerText,
  descriptionText,
  buttonText,
  buttonIcon,
  onButtonClick,
}: PromptBoxProps): React.ReactElement => {
  return (
    <VStack
      bg="gray.50"
      borderRadius="14px"
      borderWidth="1px"
      borderColor="gray.100"
      align="flex-end"
      w="full"
      maxW={816}
      padding="32px"
      spacing="16px"
    >
      <VStack align="flex-start" w="full" spacing="8px">
        <Text color="b&w.black" textStyle="title-large">
          {headerText}
        </Text>
        <Text color="gray.600" textStyle="body-large">
          {descriptionText}
        </Text>
      </VStack>
      <Button
        variant="secondary"
        colorScheme="gray.600"
        leftIcon={buttonIcon}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </VStack>
  );
};

export default PromptBox;
