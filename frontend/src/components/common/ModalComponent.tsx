import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
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
  unsavedProgressModal?: boolean;
  color?: string;
  mainButtonType?: string;
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
  unsavedProgressModal,
  color,
  mainButtonType,
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
        <Text textStyle="label" color={color}>
          {secondaryTitle.toUpperCase()}
        </Text>
        <Text paddingBottom="12px" textStyle="header-medium" color={color}>
          {primaryTitle}
        </Text>
        <ModalCloseButton marginTop="40px" marginRight="40px" size="sm" />
      </ModalHeader>
      <ModalBody>
        {modalContent}
        <ModalFooter
          paddingTop="56px"
          paddingBottom="0px"
          paddingLeft="0px"
          paddingRight="0px"
        >
          <Button variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          {unsavedProgressModal && <Spacer />}
          <Button
            variant={mainButtonType}
            // colorScheme={color}
            disabled={disabled}
            onClick={onClick}
          >
            {primaryButtonTitle}
          </Button>
        </ModalFooter>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ModalComponent;
