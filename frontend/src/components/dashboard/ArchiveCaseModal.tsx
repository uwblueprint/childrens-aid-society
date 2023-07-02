import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import ModalComponent from "../common/ModalComponent";
import intakeAPIClient from "../../APIClients/IntakeAPIClient";
import { HOME_PAGE } from "../../constants/Routes";

export type ArchiveCaseModalProps = {
  intakeID: number;
  isOpen: boolean;
  onClose: () => void;
  caseName: string;
};

const ArchiveCaseModal = ({
  intakeID,
  isOpen,
  onClose,
  caseName,
}: ArchiveCaseModalProps): React.ReactElement => {
  const archiveCase = async () => {
    const changedData: Record<string, string> = {
      intake_status: "ARCHIVED",
    };
    try {
      await intakeAPIClient.put({ changedData, intakeID });
    } catch (error) {
      return error;
    }
    onClose();
    return <Redirect to={HOME_PAGE} />;
  };
  return (
    <ModalComponent
      primaryTitle="Archive Case"
      secondaryTitle=""
      modalContent={
        <Box>
          <Text fontSize="18px" fontWeight="400">
            Are you sure you want to archive {caseName}? You will still be able
            to change the status.
          </Text>
        </Box>
      }
      disabled={false}
      primaryButtonTitle="Archive"
      onClick={archiveCase}
      isOpen={isOpen}
      onClose={onClose}
      unsavedProgressModal={false}
      mainButtonVariant="delete"
    />
  );
};

export default ArchiveCaseModal;
