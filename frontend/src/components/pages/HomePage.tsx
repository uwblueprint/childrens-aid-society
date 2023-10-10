import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FilePlus, Search } from "react-feather";
import CustomInput from "../common/CustomInput";
import IntakeHeader from "../intake/IntakeHeader";
import CaseStatus from "../../types/CaseStatus";
import FilteredSection from "../dashboard/FilteredSection";
import { CaseCardProps } from "../dashboard/CaseCard";
import IntakeApiClient from "../../APIClients/IntakeAPIClient";
import CasesContext from "../../contexts/CasesContext";
import { Case } from "../../types/CasesContextTypes";
import { useStepValueContext } from "../../contexts/IntakeValueContext";

const SecondaryHeader = (): React.ReactElement => {
  const history = useHistory();

  const { setStep } = useStepValueContext();

  function goToIntake() {
    setStep(0);
    history.push("/intake");
  }

  return (
    <Box alignSelf="stretch" flexDirection="column">
      <Text textStyle="header-large">Intake Cases</Text>
      <Flex pt="10" alignItems="space-between" alignSelf="space-between">
        <Box w="50%">
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
          onClick={goToIntake}
          leftIcon={<Icon as={FilePlus} />}
        >
          New case
        </Button>
      </Flex>
    </Box>
  );
};

const Home = (): React.ReactElement => {
  // TODO: remove console log and use context instead of state
  const casesFromContext = useContext(CasesContext);
  // eslint-disable-next-line
  console.log(casesFromContext);

  const [cases, setCases] = useState<{ [key: string]: CaseCardProps[] }>({
    active: [],
    submitted: [],
    pending: [],
    archived: [],
  });

  const mapIntakeResponsesToCaseCards = (intakes: Case[]): CaseCardProps[] => {
    if (intakes.length > 0) {
      return intakes.map((intake) => ({
        caseId:
          typeof intake.case_id === "number"
            ? intake.case_id
            : parseInt(intake.case_id, 10),
        caseLead: intake.caseReferral.referringWorkerName,
        date: intake.caseReferral.referralDate,
        familyName: intake.caseReferral.familyName,
        caseTag: intake.intakeStatus,
      }));
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const activeCases = await IntakeApiClient.get(CaseStatus.ACTIVE, 1, 20);
      const submittedCases = await IntakeApiClient.get(
        CaseStatus.SUBMITTED,
        1,
        20,
      );
      const pendingCases = await IntakeApiClient.get(CaseStatus.PENDING, 1, 20);
      const archivedCases = await IntakeApiClient.get(
        CaseStatus.ARCHIVED,
        1,
        20,
      );

      setCases({
        active: mapIntakeResponsesToCaseCards(activeCases),
        submitted: mapIntakeResponsesToCaseCards(submittedCases),
        pending: mapIntakeResponsesToCaseCards(pendingCases),
        archived: mapIntakeResponsesToCaseCards(archivedCases),
      });
    };

    fetchData();
  }, []);

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box
        display="flex"
        flexDirection="column"
        py="60px"
        width="75%"
        alignSelf="center"
      >
        <VStack spacing={12} align="stretch" alignSelf="center">
          <SecondaryHeader />

          <FilteredSection status={CaseStatus.ACTIVE} cases={cases.active} />
          <FilteredSection
            status={CaseStatus.SUBMITTED}
            cases={cases.submitted}
          />
          <FilteredSection status={CaseStatus.PENDING} cases={cases.pending} />
          <FilteredSection
            status={CaseStatus.ARCHIVED}
            cases={cases.archived}
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
