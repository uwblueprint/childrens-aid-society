import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ExistingProvider from "../ExistingProviderModal";

const ChildProviderForm = (): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button onClick={onOpen}>Select providers</Button>
      <ExistingProvider isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ChildProviderForm;
