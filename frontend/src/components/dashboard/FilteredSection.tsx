import React from "react";
import { Box, Button, Flex, Heading, Icon, Spacer } from "@chakra-ui/react";
import { ArrowRight } from "react-feather";
import { useHistory } from "react-router-dom";
import { CaseCardProps } from "./CaseCard";
import FilteredCaseDisplay from "../common/FilteredCaseDisplay";

const FilteredSection = ({
  status,
  cases,
}: {
  status: string;
  cases: CaseCardProps[];
}): React.ReactElement => {
  const history = useHistory();
  const viewAllCases = () => {
    history.push(`/cases?status=${status.toLowerCase()}`);
  };

  return (
    <Box height="40vh" minHeight="fit-content">
      <Flex>
        <Heading textStyle="header-medium">{status}</Heading>
        <Spacer />
        <Button
          variant="tertiary"
          rightIcon={<Icon as={ArrowRight} />}
          onClick={viewAllCases}
        >
          View All
        </Button>
      </Flex>
      <Box width="100%" height="100%" pt="25px">
        <FilteredCaseDisplay cases={cases} numberOfRows={1} status={status} />
      </Box>
    </Box>
  );
};

export default FilteredSection;
