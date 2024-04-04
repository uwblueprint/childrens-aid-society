import React, { useContext } from "react";
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
import CaseCard from "./CaseCard";
import CasesContext from "../../contexts/CasesContext";
import { CasesContextType } from "../../types/CasesContextTypes";

const FilteredSection = ({
  status,
  showViewAll = true,
}: {
  status: string;
  showViewAll?: boolean;
}): React.ReactElement => {
  const history = useHistory();
  const viewAllCases = () => {
    history.push(`/cases/${status.toLowerCase()}`);
  };

  const cases = useContext(CasesContext);

  const groupedCases = cases.reduce(
    (acc, _, index) =>
      index % 4 === 0 ? [...acc, cases.slice(index, index + 4)] : acc,
    [] as CasesContextType[],
  );

  return (
    <Box minHeight="fit-content">
      <Flex mb={5}>
        <Heading textStyle="header-medium">
          {status[0] + status.slice(1).toLowerCase()}
        </Heading>
        <Spacer />
        {showViewAll ? (
          <Button
            variant="tertiary"
            rightIcon={<Icon as={ArrowRight} />}
            onClick={viewAllCases}
          >
            View All
          </Button>
        ) : null}
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
            flexWrap="wrap"
            columnGap="8px"
            pb="24px"
            alignItems="flex-start"
          >
            {!showViewAll
              ? groupedCases.map((row, rowIndex) => (
                  <Flex key={rowIndex} marginBottom="20px">
                    {row.map((caseData) => (
                      <CaseCard
                        key={caseData.case_id}
                        caseId={
                          typeof caseData.case_id === "string"
                            ? parseInt(caseData.case_id, 10)
                            : caseData.case_id
                        }
                        referringWorker={
                          caseData.caseReferral.referringWorkerName
                        }
                        date={caseData.caseReferral.referralDate}
                        familyName={caseData.caseReferral.familyName}
                        caseTag={caseData.intakeStatus}
                        intakeMeetingNotes={caseData.intakeMeetingNotes}
                      />
                    ))}
                  </Flex>
                ))
              : cases
                  .slice(0, 4)
                  .map((caseData) => (
                    <CaseCard
                      key={caseData.case_id}
                      caseId={
                        typeof caseData.case_id === "string"
                          ? parseInt(caseData.case_id, 10)
                          : caseData.case_id
                      }
                      referringWorker={
                        caseData.caseReferral.referringWorkerName
                      }
                      date={caseData.caseReferral.referralDate}
                      familyName={caseData.caseReferral.familyName}
                      caseTag={caseData.intakeStatus}
                      intakeMeetingNotes={caseData.intakeMeetingNotes}
                    />
                  ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default FilteredSection;
