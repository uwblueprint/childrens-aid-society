import { Button, Center, Icon, Spacer, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LogOut } from "react-feather";

import authAPIClient from "../../APIClients/AuthAPIClient";
import AuthContext from "../../contexts/AuthContext";

const LogoutButton = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const onLogOutClick = async () => {
    const success = await authAPIClient.logout(authenticatedUser?.id);
    if (success) {
      setAuthenticatedUser(null);
    }
  };

  return (
    <Button
      variant="ghost"
      px="2"
      rounded="lg"
      border="1px"
      borderColor="blue.400"
      color="blue.400"
      onClick={onLogOutClick}
    >
      {" "}
      <Center gridGap="1">
        {" "}
        <Icon as={LogOut} />
        <Spacer /> <Text>Logout</Text>
      </Center>
    </Button>
  );
};

export default LogoutButton;
