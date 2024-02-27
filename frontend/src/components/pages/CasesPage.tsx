import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import IntakeHeader from "../intake/IntakeHeader";
import CaseStatus from "../../types/CaseStatus";
import FilteredCaseDisplay from "../common/FilteredCaseDisplay";
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";
import CasesContext from "../../contexts/CasesContext";
import { CasesContextType } from "../../types/CasesContextTypes";

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

  const [contextCases, setContextCases] = useState<CasesContextType>([]);
  const [capacity, setCapacity] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const moreCases = await IntakeAPIClient.get(enumStatus, page, 8);

      if (moreCases.length === 0) {
        setCapacity(true);
      } else {
        setContextCases((prevData: CasesContextType) => [
          ...prevData,
          ...moreCases,
        ]);
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
          <CasesContext.Provider value={contextCases}>
            <FilteredCaseDisplay
              numberOfRows={2 + (page - 1) * 2}
              status={status}
            />
          </CasesContext.Provider>
        </Box>
        {!capacity && <LoadMoreButton />}
      </Box>
    </Box>
  );
};

export default Cases;
