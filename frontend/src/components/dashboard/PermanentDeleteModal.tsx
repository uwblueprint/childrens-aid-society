import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";

type SubmitCaseProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
};

const PermanentDeleteModal = ({
  isOpen,
  onClick,
  onClose,
}: SubmitCaseProps): React.ReactElement => {
  return (
    <Box>
      <ModalComponent
        primaryTitle="Delete Archived Case"
        secondaryTitle="Attention"
        modalContent={
          <Text>
            Once this case is deleted, it will be permanently erased and this
            action is irreversible. Please confirm that you want to delete this
            case by typing “Confirm Deletion” in the text box below.
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
        primaryButtonTitle="Confirm"
      />
    </Box>
  );
};

export default PermanentDeleteModal;
