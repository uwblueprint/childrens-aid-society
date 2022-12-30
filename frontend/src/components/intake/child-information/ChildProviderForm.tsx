import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ExistingProvider from "../ExistingProviderModal";
import NewProviderModal from "../NewProviderModal";

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
    <Box>
      <Button onClick={onOpenExistingProviders}>Select providers</Button>
      <ExistingProvider
        isOpen={isOpenExistingProviders}
        onClose={onCloseExistingProviders}
      />
      <Button onClick={onOpenNewProviders}>New providers</Button>
      <NewProviderModal
        isOpen={isOpenNewProviders}
        onClose={onCloseNewProviders}
      />
    </Box>
  );
};

export default ChildProviderForm;
