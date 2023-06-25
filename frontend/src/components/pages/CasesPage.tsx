import { Box } from "@chakra-ui/react";
import React from "react";
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
      <Box>
        {/* Return Button */}
        {/* Appropriate Header */}
        {/* Grid of Appropriate Filtered Case components */}
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
        ;{/* Load more cases button (doesn't need to work) */}
      </Box>
    </Box>
  );
};

export default Cases;
