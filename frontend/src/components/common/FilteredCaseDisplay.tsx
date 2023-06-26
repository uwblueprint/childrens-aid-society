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
      <Flex key={i} justifyContent="space-between" pt="16px">
        {casesDisplayed.map((caseData: CaseCardProps) => {
          return (
            <CaseCard
              key={caseData.caseTitle}
              caseTitle={caseData.caseTitle}
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

  return <>{rows}</>;
};

export default FilteredCaseDisplay;
