import { Box, useDisclosure, Icon, VStack } from "@chakra-ui/react";
import React from "react";
import { UserPlus } from "react-feather";
import ExistingProvider from "../ExistingProviderModal";
import NewProviderModal from "../NewProviderModal";
import { DoublePromptBox } from "../PromptBox";

const ChildProviderForm = (): React.ReactElement => {
  const {
    onOpen: onOpenExistingProviders,
    isOpen: isOpenExistingProviders,
    onClose: onCloseExistingProviders,
  } = useDisclosure();
  const {
    onOpen: onOpenNewProviders,
    isOpen: isOpenNewProviders,
    onClose: onCloseNewProviders,
  } = useDisclosure();
  return (
    <>
      <VStack padding="100px">
        <DoublePromptBox
          headerText="Providers"
          descriptionText="At least one provider must be indicated for each child"
          buttonText1="Add new provider"
          buttonIcon1={<Icon as={UserPlus} w="16px" h="16px" />}
          onButtonClick1={onOpenNewProviders}
          buttonText2="Select providers"
          buttonIcon2={<Icon as={UserPlus} w="0px" margin="0px" />}
          onButtonClick2={onOpenExistingProviders}
        />
        <Box>
          <ExistingProvider
            isOpen={isOpenExistingProviders}
            onClose={onCloseExistingProviders}
          />
          <NewProviderModal
            isOpen={isOpenNewProviders}
            onClose={onCloseNewProviders}
          />
        </Box>
      </VStack>
    </>
  );
};

export default ChildProviderForm;
