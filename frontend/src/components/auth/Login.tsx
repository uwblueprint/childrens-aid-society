import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { Box, Button, Center, Icon, Text, useToast } from "@chakra-ui/react";
import { User, Lock, Eye } from "react-feather";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import CustomInput from "../common/CustomInput";
import IntakeHeader from "../intake/IntakeHeader";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  function isAuthenticatedUserType(
    res: AuthenticatedUser | string,
  ): res is AuthenticatedUser {
    const response = res as AuthenticatedUser;
    return response !== null && response.id !== undefined;
  }

  const onLogInClick = async () => {
    const user: AuthenticatedUser | string = await authAPIClient.login(
      email,
      password,
    );
    if (isAuthenticatedUserType(user)) {
      setAuthenticatedUser(user);
      toast({
        title: "SUCCESS",
        variant: "subtle",
        duration: 3000,
        status: "success",
        position: "top",
      });
    } else {
      setIsError(true);
    }
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }
  return (
    <>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
      />
      <Center h="80vh">
        <Box
          border="2px"
          borderColor="gray.100"
          rounded="xl"
          p="10"
          width="50vw"
        >
          <Text textStyle="header-large" pb="10">
            Log In
          </Text>
          <form>
            <Box>
              <Text textStyle="label" padding={1}>
                USERNAME
              </Text>
              <CustomInput
                isInvalid={isError}
                type="string"
                placeholder="firstname.lastname"
                icon={<Icon as={User} />}
                onChange={(event) => {
                  setIsError(false);
                  setEmail(event.target.value);
                }}
              />
            </Box>
            <Box pt={8}>
              <Text textStyle="label" padding={1}>
                PASSWORD
              </Text>
              <CustomInput
                isInvalid={isError}
                type={show ? "text" : "password"}
                placeholder="************"
                icon={<Icon as={Lock} />}
                rightIcon={
                  <Icon
                    as={Eye}
                    onClick={() => {
                      setShow(!show);
                    }}
                  />
                }
                rightIconShowPointerEvents
                onChange={(event) => {
                  setPassword(event.target.value);
                  setIsError(false);
                }}
              />
            </Box>

            <Text
              fontFamily="Roboto" // TODO: Set up forgot password page
              fontSize="sm"
              as="u"
              padding={1}
            >
              Forgot Password?
            </Text>

            <Center pt="8">
              <Button onClick={onLogInClick} w="30%" textStyle="button-medium">
                Log In
              </Button>
            </Center>

            <Center>
              <Text
                textStyle="body-medium"
                color="red.400"
                visibility={isError ? "visible" : "hidden"}
                textAlign="center"
              >
                The username or password entered is incorrect
              </Text>
            </Center>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default Login;
