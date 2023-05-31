import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { FilePlus, Search, ArrowRight } from "react-feather";
import CustomInput from "../common/CustomInput";
import IntakeHeader from "../intake/IntakeHeader";
import CaseStatus from "../../types/CaseTypes";

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
          onClick={
            () => {} // TODO: FINISH THIS CALLBACK
          }
          leftIcon={<Icon as={FilePlus} />}
        >
          New case
        </Button>
      </Flex>
    </Box>
  );
};

const FilteredSection = ({
  status,
  cases,
}: {
  status: string;
  cases: [];
}): React.ReactElement => {
  return (
    <Box height="25vh" minHeight="fit-content">
      <Flex>
        <Heading textStyle="header-medium">{status}</Heading>
        <Spacer />
        <Button
          variant="tertiary"
          rightIcon={<Icon as={ArrowRight} />}
          onClick={() => {}}
        >
          View All
        </Button>
      </Flex>
      <Box width="100%" height="100%">
        {cases.length <= 0 ? (
          <Center height="full">
            <Text textStyle="text-medium">
              No current {status.toLowerCase()} cases
            </Text>
          </Center>
        ) : (
          <></>
        )}
      </Box>
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
        <VStack spacing={15} align="stretch" my={12}>
          <FilteredSection status={CaseStatus.ACTIVE} cases={[]} />
          <FilteredSection status={CaseStatus.SUBMITTED} cases={[]} />
          <FilteredSection status={CaseStatus.PENDING} cases={[]} />
          <FilteredSection status={CaseStatus.ARCHIVED} cases={[]} />
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
