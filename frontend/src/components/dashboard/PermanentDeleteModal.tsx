import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";

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
        color="red.600"
        mainButtonType="warning"
        modalContent={
          <Box>
            <Box pb={5}>
              <Text textStyle="label">WARNING: </Text>
              Once this case is deleted, it will be permanently erased and this
              action is irreversible.
            </Box>
            <Box pb={3}>
              Please confirm that you want to delete this case by typing
              “Confirm Deletion” in the text box below.
            </Box>
            <CustomInput
              id="confirmDeletion"
              name="confirmDeletion"
              type="string"
              placeholder="confirmDeletion"
            />
          </Box>
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
