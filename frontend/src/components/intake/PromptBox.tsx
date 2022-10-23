import React from "react";
import {
  Button,
  Heading,
  VStack,
  HStack,
  Text
} from "@chakra-ui/react";
import { UserPlusIcon } from "./UserPlusIcon";

export type PromptBoxProps = {
  headerText: string;
  descriptionText: string;
  buttonText: string;
  formEntry: () => void;
};

const PromptBox = ({
  headerText,
  descriptionText,
  buttonText,
  formEntry
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
        <Text color="b&w.black" textStyle="title-large">{headerText}</Text>
        <Text color="gray.600" textStyle="body-large">{descriptionText}</Text>
      </VStack>
      
      <Button        
        onClick={() => {
          formEntry();
        }} variant="secondary" colorScheme="gray.600" leftIcon={<UserPlusIcon fillOpacity={0} boxSize='16px'/>}>{buttonText}</Button>
    </VStack>
  );
};



export default PromptBox;
