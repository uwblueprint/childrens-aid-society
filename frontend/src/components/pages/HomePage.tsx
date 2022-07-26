import React from "react";
import { Text } from "@chakra-ui/react";

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
    </div>
  );
};

export default Home;
