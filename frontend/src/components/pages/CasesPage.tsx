import { Box, Button, Center, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowLeft } from "react-feather";
import { useLocation } from "react-router-dom";
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
  submitted: [
    {
      caseTitle: "Case 1",
      caseLead: "Case Lead",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.SUBMITTED,
    },
  ],
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

const Cases = (): React.ReactElement => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  return (
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="80px" pt="32px">
        <Icon as={ArrowLeft} boxSize={8} />
      </Box>
      {status ? (
        <>
          <Text textStyle="header-large" px="86px" pt="16px">
            {status.charAt(0).toUpperCase() + status.slice(1)} Cases
          </Text>
          <Box px="86px" pt="32px">
            <FilteredCaseDisplay cases={cases[status]} numberOfRows={2} />
          </Box>
        </>
      ) : (
        // This is temporary
        <Text>Redirecting to homepage...</Text>
      )}
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
