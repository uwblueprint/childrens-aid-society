import { Center, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import CaseCard from "../dashboard/CaseCard";
import { Case } from "../../types/CasesContextTypes";
import CasesContext from "../../contexts/CasesContext";

interface Props {
  numberOfRows: number;
  status: string;
}

const FilteredCaseDisplay = ({
  numberOfRows,
  status,
}: Props): React.ReactElement => {
  const cases = useContext(CasesContext);

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
        {casesDisplayed.map((caseData: Case) => {
          return (
            <CaseCard
              key={caseData.case_id}
              caseDetails={caseData}
              caseId={
                typeof caseData.case_id === "string"
                  ? parseInt(caseData.case_id, 10)
                  : caseData.case_id
              }
              caseTag={caseData.intakeStatus}
              intakeMeetingNotes={caseData.intakeMeetingNotes}
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
      alignSelf="flex-start"
      width="min-content"
      marginLeft="auto"
      marginRight="auto"
    >
      {rows}
    </Flex>
  );
};

export default FilteredCaseDisplay;
