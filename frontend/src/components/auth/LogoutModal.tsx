import React from "react";
import { Box } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";

type LogoutModalProps = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
};

const LogoutModal = ({
  isOpen,
  onClick,
  onClose,
}: LogoutModalProps): React.ReactElement => {
  return (
    <ModalComponent
      isOpen={isOpen}
      primaryTitle="Confirm Log Out"
      primaryButtonTitle="Log Out"
      mainButtonVariant="primary"
      onClick={onClick}
      modalContent={<Box>You&apos;ll be returned to the login screen.</Box>}
      onClose={onClose}
      disabled={false}
      secondaryTitle=""
      showModalCloseButton={false}
    />
  );
};

export default LogoutModal;
