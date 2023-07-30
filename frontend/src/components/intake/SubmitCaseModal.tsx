import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";

type SubmitCaseProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
};

const SubmitCaseModal = ({
  isOpen,
  onClick,
  onClose,
}: SubmitCaseProps): React.ReactElement => {
  return (
    <Box>
      <ModalComponent
        primaryTitle="Submit case details"
        secondaryTitle="Case intake"
        modalContent={
          <Text>
            All details will be recorded and will be reviewed by ______. *insert
            other text about what you can or cannot do after submission*
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
        primaryButtonTitle="Submit case details"
      />
    </Box>
  );
};

export default SubmitCaseModal;
