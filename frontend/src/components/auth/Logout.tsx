import { Button, Icon } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { LogOut } from "react-feather";

import authAPIClient from "../../APIClients/AuthAPIClient";
import AuthContext from "../../contexts/AuthContext";
import LogoutModal from "./LogoutModal";

const LogoutButton = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false)

  const onLogOutClick = async () => {
    const success = await authAPIClient.logout(authenticatedUser?.id);
    if (success) {
      setAuthenticatedUser(null);
      setOpenModal(false)
    }
  };

  const onClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        px="2"
        rounded="lg"
        border="1px"
        borderColor="blue.400"
        color="blue.400"
        onClick={() => setOpenModal(true)}
        leftIcon={<Icon as={LogOut} />}
      >
        Logout
      </Button>
      <LogoutModal
        isOpen={openModal}
        onClick={onLogOutClick}
        onClose={() => onClose()}
      />
    </>
  );
};

export default LogoutButton;
