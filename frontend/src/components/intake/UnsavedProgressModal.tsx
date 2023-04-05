import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";

type UnsavedProgressProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  reviewVersion?: boolean;
};

const UnsavedProgressModal = ({
  isOpen,
  onClick,
  onClose,
  reviewVersion,
}: UnsavedProgressProps): React.ReactElement => {
  return (
    <Box>
      <ModalComponent
        primaryTitle="Unsaved Progress"
        secondaryTitle="Case Referral"
        modalContent={
          <Text>
            Are you sure you want to leave this page? Your{" "}
            {reviewVersion ? "new edits" : "information"} will not be saved if
            you go back.
          </Text>
        }
        onClick={() => {
          onClick();
          onClose();
        }}
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        disabled={false}
        primaryButtonTitle="Continue"
        unsavedProgressModal
      />
    </Box>
  );
};

export default UnsavedProgressModal;
