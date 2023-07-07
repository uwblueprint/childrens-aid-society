import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import CaseCard, { CaseCardProps } from "../dashboard/CaseCard";

interface Props {
  cases: CaseCardProps[];
  numberOfRows: number;
  status: string;
}

const FilteredCaseDisplay = ({
  cases,
  numberOfRows,
  status,
}: Props): React.ReactElement => {
  if (cases.length <= 0) {
    return (
      <Center height="full">
        <Text textStyle="text-medium">
          No current {status.toLowerCase()} cases
        </Text>
      </Center>
    );
  }

  const rows = [];
  for (let i = 0; i < numberOfRows; i += 1) {
    const start = i * 4;
    const end = start + 4;
    const casesDisplayed = cases.slice(start, end);
    const fillerBoxAmount = 4 - casesDisplayed.length;

    rows.push(
      <Flex key={i} pb="24px">
        {casesDisplayed.map((caseData: CaseCardProps) => {
          return (
            <Box px="12px" key={caseData.caseId}>
              <CaseCard
                key={caseData.caseId}
                caseId={caseData.caseId}
                caseLead={caseData.caseLead}
                date={caseData.date}
                familyName={caseData.familyName}
                caseTag={caseData.caseTag}
              />
            </Box>
          );
        })}
        {Array.from({ length: fillerBoxAmount }, (_, index) => (
          <Box mx="12px" px="30px" width="297px" key={index} />
        ))}
      </Flex>,
    );
  }

  return (
    <Flex justifyContent="center" flexWrap="wrap">
      {rows}
    </Flex>
  );
};

export default FilteredCaseDisplay;
