import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowLeft } from "react-feather";
import IntakeHeader from "../intake/IntakeHeader";
import CaseStatus from "../../types/CaseStatus";
import CaseCard, { CaseCardProps } from "../dashboard/CaseCard";

const cases: { [key: string]: CaseCardProps[] } = {
  active: [
    {
      caseTitle: "Case 1",
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
      caseTitle: "Case 1",
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
  return (
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="80px" pt="32px">
        {/* Return Button */}
        <Icon as={ArrowLeft} boxSize={8} />
      </Box>
      {/* Appropriate Header */}
      <Text textStyle="header-large" px="86px" pt="32px">
        Active Cases
      </Text>
      <Box px="86px" pt="32px">
        {/* Grid of Appropriate Filtered Case components */}
        <Flex justifyContent="space-between">
          {cases.active.map((caseData: CaseCardProps) => {
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
        </Flex>
      </Box>
      {/* Load more cases button (doesn't need to work) */}
      <Flex justifyContent="center" pt="45px">
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
