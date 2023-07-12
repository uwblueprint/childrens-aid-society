import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";

type DeleteConfirmationProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  providerName: string;
};

const DeleteConfirmationModal = ({
  isOpen,
  onClick,
  onClose,
  providerName,
}: DeleteConfirmationProps): React.ReactElement => {
  return (
    <Box>
      <ModalComponent
        primaryTitle="Remove permitted individual"
        secondaryTitle="Individual Details"
        modalContent={
          <Text>
            This will remove the individual {providerName} from this case. You
            will need to re-enter their information to add them to the case
            intake file.
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
        primaryButtonTitle="Remove permitted individual"
      />
    </Box>
  );
};

export default DeleteConfirmationModal;
