import { Box, useDisclosure, Icon, VStack } from "@chakra-ui/react";
import React from "react";
import { UserPlus } from "react-feather";
import ExistingProvider from "../ExistingProviderModal";
import NewProviderModal from "../NewProviderModal";
import PromptBox from "../PromptBox";

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
        <PromptBox
          headerText="Providers"
          descriptionText="At least one provider must be indicated for each child"
          buttonText="Select providers"
          buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          onButtonClick={onOpenNewProviders}
          secondaryButtonText="Add new provider"
          secondaryOnButtonClick={onOpenExistingProviders}
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
