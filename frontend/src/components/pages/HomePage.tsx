import React, { useEffect, useState } from "react";
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
import IntakeApiClient, {
  IntakeResponse,
} from "../../APIClients/IntakeAPIClient";

const SecondaryHeader = (): React.ReactElement => {
  const history = useHistory();

  function goToIntake() {
    history.push("/intake");
  }

  return (
    <Box>
      <Text textStyle="header-large">Intake Cases</Text>
      <Flex pt="10">
        <Box w="20%">
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
  const [cases, setCases] = useState<{ [key: string]: CaseCardProps[] }>({
    active: [],
    submitted: [],
    pending: [],
    archived: [],
  });

  const mapIntakeResponsesToCaseCards = (
    intakes: IntakeResponse[],
  ): CaseCardProps[] => {
    return intakes.map((intake) => ({
      caseId:
        typeof intake.case_id === "number"
          ? intake.case_id
          : parseInt(intake.case_id, 10),
      caseLead: intake.caseReferral.referringWorkerName,
      date: intake.caseReferral.referralDate,
      familyName: intake.caseReferral.familyName,
      caseTag: CaseStatus.ACTIVE,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeCases = await IntakeApiClient.get("ACTIVE", 1, 20);
        const submittedCases = await IntakeApiClient.get("SUBMITTED", 1, 20);
        const pendingCases = await IntakeApiClient.get("PENDING", 1, 20);
        const archivedCases = await IntakeApiClient.get("ARCHIVED", 1, 20);

        setCases({
          active: mapIntakeResponsesToCaseCards(activeCases),
          submitted: mapIntakeResponsesToCaseCards(submittedCases),
          pending: mapIntakeResponsesToCaseCards(pendingCases),
          archived: mapIntakeResponsesToCaseCards(archivedCases),
        });
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="100px" py="60px">
        <SecondaryHeader />
        <VStack spacing={15} align="stretch" my={12}>
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
