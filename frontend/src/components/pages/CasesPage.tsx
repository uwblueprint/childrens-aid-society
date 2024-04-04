import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";
import CaseStatus from "../../types/CaseStatus";
import { Case } from "../../types/CasesContextTypes";
import FilteredCaseDisplay from "../common/FilteredCaseDisplay";
import { CaseCardProps } from "../dashboard/CaseCard";
import IntakeHeader from "../intake/IntakeHeader";

const Cases = (): React.ReactElement | null => {
  const { status } = useParams<{ status: string }>();
  const history = useHistory();

  const goToHomepage = () => {
    history.push("/");
  };

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const statusToCaseStatus: Record<string, CaseStatus> = {
    active: CaseStatus.ACTIVE,
    archived: CaseStatus.ARCHIVED,
    submitted: CaseStatus.SUBMITTED,
    pending: CaseStatus.PENDING,
  };

  const enumStatus = statusToCaseStatus[status];

  const [cases, setCases] = useState<CaseCardProps[]>([]);
  const [capacity, setCapacity] = useState(false);
  const [page, setPage] = useState(1);

  const mapIntakeResponsesToCaseCards = (intakes: Case[]): CaseCardProps[] => {
    if (intakes.length > 0) {
      return intakes.map((intake) => ({
        caseId:
          typeof intake.case_id === "number"
            ? intake.case_id
            : parseInt(intake.case_id, 10),
        referringWorker: intake.caseReferral.referringWorkerName,
        date: intake.caseReferral.referralDate,
        familyName: intake.caseReferral.familyName,
        caseTag: intake.intakeStatus,
      }));
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const moreCases = mapIntakeResponsesToCaseCards(
        await IntakeAPIClient.get(enumStatus, page, 8),
      );

      if (moreCases.length === 0) {
        setCapacity(true);
      } else {
        setCases((prevData) => [...prevData, ...moreCases]);
      }
    };

    fetchData();
  }, [enumStatus, page]);

  const handleLoadMore = () => {
    setPage(page + 1); // Increment the page number to load the next page
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
          onClick={handleLoadMore}
        >
          Load More Cases
        </Button>
      </Flex>
    );
  };

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
            cases={cases}
            numberOfRows={2 + (page - 1) * 2}
            status={status}
          />
        </Box>
        {!capacity && <LoadMoreButton />}
      </Box>
    </Box>
  );
};

export default Cases;
