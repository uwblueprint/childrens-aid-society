import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type SubmitErrorProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SubmitErrorModal = ({
  isOpen,
  onClose,
}: SubmitErrorProps): React.ReactElement => {
  return (
    <Box>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent padding="32px">
          <ModalHeader>
            <Text paddingBottom="12px" textStyle="header-medium">
              Something Went Wrong...
            </Text>
          </ModalHeader>
          <ModalBody>
            We couldn’t submit your case. Please try again. If the problem
            continues, please contact XXX.
            <ModalFooter
              paddingTop="56px"
              paddingBottom="0px"
              paddingLeft="0px"
              paddingRight="0px"
            >
              <Button
                variant="primary"
                onClick={() => {
                  // TODO: implement behaviour for refresh button
                  onClose();
                }}
              >
                Refresh Page
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SubmitErrorModal;
