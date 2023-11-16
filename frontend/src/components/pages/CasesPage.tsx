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
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 1,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 2,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 3,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 4,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
    {
      caseId: 5,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ACTIVE,
    },
  ],
  submitted: [],
  pending: [
    {
      caseId: 6,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.PENDING,
    },
  ],
  archived: [
    {
      caseId: 7,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ARCHIVED,
    },
    {
      caseId: 8,
      referringWorker: "John Doe Worker",
      date: "11/06/2023",
      familyName: "Family Name",
      caseTag: CaseStatus.ARCHIVED,
    },
    {
      caseId: 9,
      referringWorker: "John Doe Worker",
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
        <Flex justifyContent="left">
          <Button
            marginLeft="calc(-10% - 20px)"
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
        <Text textStyle="header-large" marginLeft="-10%" pt="16px">
          {formattedStatus} Cases
        </Text>
        <Box pt="60px" marginLeft="-10%" alignSelf="flex-start">
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
