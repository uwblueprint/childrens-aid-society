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
  return (
    <Box height="40vh" minHeight="fit-content">
      <Flex mb={5}>
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
          <Flex justifyContent="space-between">
            {cases.slice(0, 4).map((caseData: CaseCardProps) => {
              return (
                <CaseCard
                  key={caseData.caseId}
                  caseId={caseData.caseId}
                  caseLead={caseData.caseLead}
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
