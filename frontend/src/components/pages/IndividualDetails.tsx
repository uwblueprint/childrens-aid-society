import React from "react";
import { Heading, Box, Button, useDisclosure } from "@chakra-ui/react";
import NewCaregiverModal from "../intake/NewCaregiverModal";

const IndividualDetails = (): React.ReactElement => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Heading>Individual Details Page</Heading>
      <Button onClick={onOpen}>Add caregivers</Button>
      <NewCaregiverModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default IndividualDetails;
