import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDown,
  Cloud,
  Feather,
  FilePlus,
  LogOut,
  Plus,
  Search,
} from "react-feather";
import CustomInput from "../common/CustomInput";
import CustomTag from "../common/CustomTag";
import IntakeHeader from "../intake/IntakeHeader";

const SecondaryHeader = (): React.ReactElement => {
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
          onClick={() => console.log("FINISH THIS CALLBACK")}
        >
          {" "}
          <Center gridGap="1">
            {" "}
            <Icon as={FilePlus} />
            <Spacer /> <Text>New case</Text>
          </Center>
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
