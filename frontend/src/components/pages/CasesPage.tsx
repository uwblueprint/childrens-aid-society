import { Box, Button, Center, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowLeft } from "react-feather";
import { useHistory, useLocation } from "react-router-dom";
import IntakeHeader from "../intake/IntakeHeader";
import CaseStatus from "../../types/CaseStatus";
import { CaseCardProps } from "../dashboard/CaseCard";
import FilteredCaseDisplay from "../common/FilteredCaseDisplay";

const cases: { [key: string]: CaseCardProps[] } = {
  active: [
    {
      caseTitle: "Case 0",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseTitle: "Case 1",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseTitle: "Case 2",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseTitle: "Case 3",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseTitle: "Case 4",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
  ],
  submitted: [],
  pending: [
    {
      caseTitle: "Case 1",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.PENDING,
    },
  ],
  archived: [
    {
      caseTitle: "Case 1",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ARCHIVED,
    },
  ],
};

const Cases = (): React.ReactElement | null => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const history = useHistory();

  const goToHomepage = () => {
    history.push("/");
  };

  if (!status) {
    goToHomepage();
    return null;
  }

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
  const validStatus = Object.values(CaseStatus).includes(
    formattedStatus as CaseStatus,
  );

  if (!validStatus) {
    goToHomepage();
    return null;
  }

  return (
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Button
        variant="tertiary"
        leftIcon={<Icon as={ArrowLeft} boxSize={8} color="black" />}
        onClick={goToHomepage}
        ml="65px"
        mt="32px"
      />
      <Text textStyle="header-large" px="86px" pt="16px">
        {formattedStatus} Cases
      </Text>
      <Box px="86px" pt="32px">
        <FilteredCaseDisplay
          cases={cases[status]}
          numberOfRows={2}
          status={status}
        />
      </Box>
      <Flex justifyContent="center" py="45px">
        <Button
          variant="ghost"
          px="2"
          rounded="lg"
          border="1px"
          borderColor="blue.400"
          color="blue.400"
          bg="blue.50"
        >
          Load More Cases
        </Button>
      </Flex>
    </Box>
  );
};

export default Cases;
