import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
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
      caseId: 0,
      caseLead: "Case 0",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 1,
      caseLead: "Case 1",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 2,
      caseLead: "Case 2",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 3,
      caseLead: "Case 3",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 4,
      caseLead: "Case 4",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 5,
      caseLead: "Case 5",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
  ],
  submitted: [],
  pending: [
    {
      caseId: 6,
      caseLead: "Case 1",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.PENDING,
    },
  ],
  archived: [
    {
      caseId: 7,
      caseLead: "Case 1",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ARCHIVED,
    },
    {
      caseId: 8,
      caseLead: "Case 1",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ARCHIVED,
    },
    {
      caseId: 9,
      caseLead: "Case 1",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ARCHIVED,
    },
  ],
};

const LoadMoreButton = () => {
  return (
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
  );
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
    status.toUpperCase() as CaseStatus,
  );

  if (!validStatus) {
    goToHomepage();
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box display="flex" flexDirection="column" width="75%" alignSelf="center">
        <Flex justifyContent="center">
          <Button
            marginRight="1250px"
            variant="tertiary"
            onClick={goToHomepage}
            mt="32px"
            leftIcon={
              <Icon
                as={ArrowLeft}
                boxSize={8}
                color="black"
                _hover={{ color: "gray" }}
              />
            }
          />
        </Flex>
        <Text textStyle="header-large" marginLeft="calc(50% - 630px)" pt="16px">
          {formattedStatus} Cases
        </Text>
        <Box pt="60px" alignSelf="flex-start">
          <FilteredCaseDisplay
            cases={cases[status]}
            numberOfRows={2}
            status={status}
          />
        </Box>
        {cases[status].length && <LoadMoreButton />}
      </Box>
    </Box>
  );
};

export default Cases;
