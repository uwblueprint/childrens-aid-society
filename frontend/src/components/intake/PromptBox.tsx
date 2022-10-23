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
};

const PromptBox = ({
  headerText,
  descriptionText,
  buttonText
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
      
      <Button leftIcon={<UserPlusIcon boxSize={5} color='gray'/>}>{buttonText}</Button>
    </VStack>
  );
};

export default PromptBox;


// // using `path`
// export const UpDownIcon = createIcon({
//   displayName: 'UpDownIcon',
//   viewBox: '0 0 200 200',
//   // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
//   path: (
//     <path
//       fill='currentColor'
//       d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
//     />
//   ),
// })