import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";

type SubmitVisitProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
};

const SubmitVisitModal = ({
  isOpen,
  onClick,
  onClose,
}: SubmitVisitProps): React.ReactElement => {
  return (
    <Box>
      <ModalComponent
        primaryTitle="Visit Log Completed"
        secondaryTitle="Visit Log"
        modalContent={
          <Text>
            Please confirm that you have finished entering all your information
            and wish to submit this visit. After submitting, you will still be
            able to make edits at any time.
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
        primaryButtonTitle="Submit"
      />
    </Box>
  );
};

export default SubmitVisitModal;
