import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
  Icon,
  Button,
} from "@chakra-ui/react";
import { LogOut } from "react-feather";
import LogoutButton from "../auth/Logout";

export type IntakeHeaderProps = {
  primaryTitle: string;
  secondaryTitle: string;
  hasLogout?: boolean;
};

const IntakeHeader = ({
  primaryTitle,
  secondaryTitle,
  hasLogout,
}: IntakeHeaderProps): React.ReactElement => {
  return (
    <Box bg="gray.50" style={{ padding: "50px 100px 25px 100px" }}>
      <Text color="gray.600" textStyle="title-small">
        {secondaryTitle}
      </Text>
      <Flex>
        <Heading textStyle="display-medium">{primaryTitle}</Heading>
        <Spacer />
        {hasLogout ? <LogoutButton /> : null}
      </Flex>
    </Box>
  );
};

export default IntakeHeader;
