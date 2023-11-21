import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
  Center,
} from "@chakra-ui/react";
import { ArrowRight } from "react-feather";
import CaseCard, { CaseCardProps } from "./CaseCard";

const FilteredSection = ({
  status,
  cases,
}: {
  status: string;
  cases: CaseCardProps[];
}): React.ReactElement => {
  const history = useHistory();
  const viewAllCases = () => {
    history.push(`/cases/${status.toLowerCase()}`);
  };

  return (
    <Box minHeight="fit-content">
      <Flex mb={5}>
        <Heading textStyle="header-medium">
          {status[0] + status.slice(1).toLowerCase()}
        </Heading>
        <Spacer />
        <Button
          variant="tertiary"
          rightIcon={<Icon as={ArrowRight} />}
          onClick={viewAllCases}
        >
          View All
        </Button>
      </Flex>
      <Box width="100%" height="100%">
        {cases.length <= 0 ? (
          <Center height="289px" width="60vw">
            <Text textStyle="text-medium">
              No current {status.toLowerCase()} cases
            </Text>
          </Center>
        ) : (
          <Flex
            flexBasis="100%"
            columnGap="8px"
            pb="24px"
            alignItems="flex-start"
          >
            {cases.slice(0, 4).map((caseData: CaseCardProps) => {
              return (
                <CaseCard
                  key={caseData.caseId}
                  caseId={caseData.caseId}
                  referringWorker={caseData.referringWorker}
                  date={caseData.date}
                  familyName={caseData.familyName}
                  caseTag={caseData.caseTag}
                />
              );
            })}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default FilteredSection;
