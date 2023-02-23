import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { Button, Text, useToast } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const toast = useToast();

  const onLogInClick = async () => {
    try {
      const user: AuthenticatedUser = await authAPIClient.login(
        email,
        password,
      );
      setAuthenticatedUser(user);
    } catch {
      toast({
        title: "ERROR",
        variant: "subtle",
        duration: 3000,
        status: "error",
        position: "top",
      });
    }
    toast({
      title: "SUCCESS",
      variant: "subtle",
      duration: 3000,
      status: "success",
      position: "top",
    });
  };

  const onSignUpClick = () => {
    history.push(SIGNUP_PAGE);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Text>Login</Text>
      <form>
        <div>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="username@domain.com"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />
        </div>
        <div>
          <Button onClick={onLogInClick} textStyle="button-medium">
            Log In
          </Button>
        </div>
      </form>
      <div>
        <Button onClick={onSignUpClick} textStyle="button-medium">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;
