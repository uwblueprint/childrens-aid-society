import { Center, Flex, Text } from "@chakra-ui/react";
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

    rows.push(
      <Flex
        key={i}
        flexBasis="100%"
        columnGap="8px"
        pb="24px"
        alignItems="flex-start"
      >
        {casesDisplayed.map((caseData: CaseCardProps) => {
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
      </Flex>,
    );
  }

  return (
    <Flex
      flexWrap="wrap"
      justifyContent="flex-start"
      width="min-content"
      marginLeft="auto"
      marginRight="auto"
    >
      {rows}
    </Flex>
  );
};

export default FilteredCaseDisplay;
