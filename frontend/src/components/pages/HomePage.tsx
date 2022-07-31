import React from "react";
import { Text, Box } from "@chakra-ui/react";

const Home = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <Text
        style={{
          marginBottom: "50px",
        }}
        textStyle="display-large"
      >
        Homepage 🏠
      </Text>
      <Text style={{ margin: "10px" }} textStyle="display-large">
        display-large
      </Text>
      <Text style={{ margin: "10px" }} textStyle="display-medium">
        display-medium
      </Text>
      <Text style={{ margin: "10px" }} textStyle="header-large">
        header-large
      </Text>
      <Text style={{ margin: "10px" }} textStyle="header-medium">
        header-medium
      </Text>
      <Text style={{ margin: "10px" }} textStyle="title-large">
        title-large
      </Text>
      <Text style={{ margin: "10px" }} textStyle="title-medium">
        title-medium
      </Text>
      <Text style={{ margin: "10px" }} textStyle="title-small">
        title-small
      </Text>
      <Text style={{ margin: "10px" }} textStyle="body-large">
        body-large
      </Text>
      <Text style={{ margin: "10px" }} textStyle="body-medium">
        body-medium
      </Text>
      <Text style={{ margin: "10px" }} textStyle="button-medium">
        button-medium
      </Text>
      <Text style={{ margin: "10px" }} textStyle="button-small">
        button-small
      </Text>
      <Text style={{ margin: "10px" }} textStyle="label">
        label
      </Text>
      <Box
        background="blue.500"
        width="100%"
        p="25px"
        borderRadius="0 0 5px 5px"
      />
      <Box
        background="red.400"
        width="100%"
        p="25px"
        borderRadius="0 0 5px 5px"
      />
      <Box
        background="green.50"
        width="100%"
        p="25px"
        borderRadius="0 0 5px 5px"
      />
      <Box background="pink.400" margin={20}>
        Test Spacing 20 (12 rem)
      </Box>
      <Box background="cyan.50" margin={8}>
        Test Spacing 8 (2 rem)
      </Box>
      <Box background="orange.400" margin={2}>
        Test Spacing 2 (0.5 rem)
      </Box>
    </div>
  );
};

export default Home;
