import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";

type SubmitCaseProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
};

const PermanentDeleteModal = ({
  isOpen,
  onClose,
}: SubmitCaseProps): React.ReactElement => {
  const [confirmationInput, setConfirmationInput] = useState("");

  const deleteConfirmatonText = "Confirm Deletion";

  const handleConfirmationInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmationInput(event.target.value);
  };

  const isConfirmationValid =
    confirmationInput.trim() === deleteConfirmatonText;

  return (
    <Box>
      <ModalComponent
        primaryTitle="Delete Archived Case"
        secondaryTitle="Attention"
        titleColor="red.600"
        mainButtonVariant="warning"
        modalContent={
          <Box>
            <Box pb={5}>
              <Text textStyle="label">WARNING: </Text>
              Once this case is deleted, it will be permanently erased and this
              action is irreversible.
            </Box>
            <Box pb={3}>
              Please confirm that you want to delete this case by typing “
              {deleteConfirmatonText}” in the text box below.
            </Box>
            <CustomInput
              id="confirmDeletion"
              name="confirmDeletion"
              type="string"
              placeholder="Insert text here"
              value={confirmationInput}
              onChange={handleConfirmationInputChange}
            />
          </Box>
        }
        onClick={() => {}}
        isOpen={isOpen}
        onClose={onClose}
        disabled={!isConfirmationValid}
        primaryButtonTitle="Confirm"
      />
    </Box>
  );
};

export default PermanentDeleteModal;
