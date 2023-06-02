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
import { ArrowRight } from "react-feather";

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

export default FilteredSection;