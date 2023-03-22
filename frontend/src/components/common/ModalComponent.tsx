import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";

export type ModalProps = {
  primaryTitle: string;
  secondaryTitle: string;
  modalContent: React.ReactElement;
  disabled: boolean;
  primaryButtonTitle: string;
  onClick: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const ModalComponent = ({
  primaryTitle,
  modalContent,
  disabled,
  onClick,
  primaryButtonTitle,
  secondaryTitle,
  isOpen,
  onClose,
}: ModalProps): React.ReactElement => (
  <Modal
    isCentered
    isOpen={isOpen}
    onClose={onClose}
    size="5xl"
    scrollBehavior="inside"
  >
    <ModalOverlay />
    <ModalContent padding="32px">
      <ModalHeader>
        <Text textStyle="label">{secondaryTitle.toUpperCase()}</Text>
        <Text paddingBottom="12px" textStyle="header-medium">
          {primaryTitle}
        </Text>
        <ModalCloseButton marginTop="40px" marginRight="40px" size="sm" />
      </ModalHeader>
      <ModalBody>
        {modalContent}
        <ModalFooter paddingTop="56px" paddingRight="0px" paddingBottom="0px">
          <Button variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={disabled} onClick={onClick}>
            {primaryButtonTitle}
          </Button>
        </ModalFooter>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ModalComponent;
