import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Flex, Heading, Icon, Spacer } from "@chakra-ui/react";
import { FilePlus, Search } from "react-feather";
import CustomInput from "../common/CustomInput";
import IntakeHeader from "../intake/IntakeHeader";


const SecondaryHeader = (): React.ReactElement => {
  const history = useHistory();
  function goToIntake() {
    history.push("/intake");
  }
  return (
    <Box>
      <Heading textStyle="display-medium">Intake Cases</Heading>
      <Flex pt="10">
        <Box w="20%">
          <CustomInput
            placeholder="Search By Family Name"
            icon={<Icon as={Search} />}
          />
        </Box>

        <Spacer />
        <Button
          height="100%"
          px="2"
          rounded="lg"
          border="1px"
          onClick={goToIntake}
          leftIcon={<Icon as={FilePlus} />}
        >
          New case
        </Button>
      </Flex>
    </Box>
  );
};

const Home = (): React.ReactElement => {
  return (
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="100px" pt="60px">
        <SecondaryHeader />
      </Box>
    </Box>
  );
};

export default Home;
