import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";

type PermanentDeleteModalProps = {
  isOpen: boolean;
  intakeId: number;
  onClose: () => void;
  onClick: () => void;
};

const PermanentDeleteModal = ({
  isOpen,
  intakeId,
  onClose,
  onClick,
}: PermanentDeleteModalProps): React.ReactElement => {
  const [confirmationInput, setConfirmationInput] = useState("");

  const deleteConfirmationText = "Confirm Deletion";

  const handleConfirmationInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmationInput(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await IntakeAPIClient.deleteIntake(intakeId);
    } catch (error) {
      console.log("intake api client was not called");
    }
  };

  const isConfirmationValid =
    confirmationInput.trim() === deleteConfirmationText;

  const handleConfirmDelete = () => {
    if (isConfirmationValid) {
      handleDelete();
      onClick();
    }
  };

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
              Please confirm that you want to delete this case by typing &quot;
              {deleteConfirmationText}&quot; in the text box below.
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
        onClick={handleConfirmDelete}
        isOpen={isOpen}
        onClose={onClose}
        disabled={!isConfirmationValid}
        primaryButtonTitle="Confirm"
      />
    </Box>
  );
};

export default PermanentDeleteModal;
