import React from "react";
import { Text } from "@chakra-ui/react";

const NotFound = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <Text textStyle="header-large">404 Not Found 🙁</Text>
    </div>
  );
};

export default NotFound;
