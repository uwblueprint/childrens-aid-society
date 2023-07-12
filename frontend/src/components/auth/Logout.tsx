import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LogOut } from "react-feather";

import authAPIClient from "../../APIClients/AuthAPIClient";
import AuthContext from "../../contexts/AuthContext";
import LogoutModal from "./LogoutModal";

const LogoutButton = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const {
    onOpen: onOpenLogoutModal,
    isOpen: isOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure();

  const onLogOutClick = async () => {
    const success = await authAPIClient.logout(authenticatedUser?.id);
    if (success) {
      setAuthenticatedUser(null);
      onCloseLogoutModal();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        px="2"
        rounded="lg"
        border="1px"
        borderColor="blue.400"
        color="blue.400"
        onClick={onOpenLogoutModal}
        leftIcon={<Icon as={LogOut} />}
      >
        Logout
      </Button>
      <LogoutModal
        isOpen={isOpenLogoutModal}
        onClick={() => onLogOutClick()}
        onClose={onCloseLogoutModal}
      />
    </>
  );
};

export default LogoutButton;
