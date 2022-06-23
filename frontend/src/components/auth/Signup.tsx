import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { Button, Text } from "@chakra-ui/react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

const Signup = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignupClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.register(
      firstName,
      lastName,
      email,
      password,
    );
    setAuthenticatedUser(user);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Text>Signup</Text>
      <form>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="first name"
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="last name"
          />
        </div>
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
          <Button onClick={onSignupClick} textStyle="body-regular">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
