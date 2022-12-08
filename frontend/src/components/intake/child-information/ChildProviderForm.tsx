import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ExistingProvider from "../ExistingProviderModal";
import NewProviderModal from "../NewProviderModal";

const ChildProviderForm = (): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpen2,
    isOpen: isOpen2,
    onClose: onClose2,
  } = useDisclosure();
  return (
    <Box>
      <Button onClick={onOpen}>Select providers</Button>
      <ExistingProvider isOpen={isOpen} onClose={onClose} />
      <Button onClick={onOpen2}>New providers</Button>
      <NewProviderModal isOpen={isOpen2} onClose={onClose2} />
    </Box>
  );
};

export default ChildProviderForm;
