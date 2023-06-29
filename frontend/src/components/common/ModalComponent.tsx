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
  showLeftButton?: boolean;
  leftButtonTitle?: string;
  leftButtonVariant?: string;
  onLeftButtonClick?: () => void;
  titleColor?: string;
  mainButtonVariant?: string;
  showModalCloseButton?: boolean;
  onClearPage?: () => void;
  meetingNotes?: string;
  workerName?: string;
};

const ModalComponent = ({
  meetingNotes,
  workerName,
  primaryTitle,
  modalContent,
  disabled,
  onClick,
  primaryButtonTitle,
  secondaryTitle,
  isOpen,
  onClose,
  unsavedProgressModal,
  showLeftButton,
  leftButtonTitle,
  leftButtonVariant,
  onLeftButtonClick,
  titleColor,
  mainButtonVariant,
  showModalCloseButton = true,
  onClearPage,
}: ModalProps): React.ReactElement => {
  const shouldShowClearButton = meetingNotes !== "" || workerName !== "";
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      returnFocusOnClose={false}
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent padding="32px">
        <ModalHeader>
          <Text textStyle="label" color={titleColor}>
            {secondaryTitle.toUpperCase()}
          </Text>
          <Text
            paddingBottom="12px"
            textStyle="header-medium"
            color={titleColor}
          >
            {primaryTitle}
          </Text>
          {showModalCloseButton && (
            <ModalCloseButton marginTop="40px" marginRight="40px" size="sm" />
          )}
        </ModalHeader>
        <ModalBody>
          {modalContent}
          <ModalFooter
            paddingTop="56px"
            paddingBottom="0px"
            paddingLeft="0px"
            paddingRight="0px"
          >
            {showLeftButton && (
              <>
                <Button variant={leftButtonVariant} onClick={onLeftButtonClick}>
                  {leftButtonTitle}
                </Button>
                <Spacer />
              </>
            )}
            {shouldShowClearButton && (
              <Button variant="tertiary" onClick={onClearPage}>
                Clear Page
              </Button>
            )}
            {unsavedProgressModal && <Spacer />}
            <Button
              variant={mainButtonVariant}
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
};

export default ModalComponent;
