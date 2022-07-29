import React from "react";
import { Button, Text, Box } from "@chakra-ui/react";

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
      <Button variant="primary">Primary</Button>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="tertiary" disabled>
        Tertiary Disabled
      </Button>
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
    </div>
  );
};

export default Home;
