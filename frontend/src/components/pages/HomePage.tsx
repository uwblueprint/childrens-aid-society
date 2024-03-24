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
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";
import FilteredSection from "../dashboard/FilteredSection";
import { CasesContextType } from "../../types/CasesContextTypes";
import { useStepValueContext } from "../../contexts/IntakeValueContext";
import CasesContext from "../../contexts/CasesContext";

const SecondaryHeader = ({
  searchValue,
  setSearchValue,
  handleSearch,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}): React.ReactElement => {
  const history = useHistory();

  const { setStep } = useStepValueContext();

  const goToIntake = () => {
    setStep(0);
    history.push("/intake");
  };

  // const {
  //   onOpen: onOpenPermanentDelete,
  //   isOpen: isOpenPermanentDelete,
  //   onClose: onClosePermanentDelete,
  // } = useDisclosure();

  // const {
  //   onOpen: onOpenStatusModal,
  //   isOpen: isOpenStatusModal,
  //   onClose: onCloseStatusModal,
  // } = useDisclosure();

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box alignSelf="stretch" flexDirection="column">
      <Text textStyle="header-large">Intake Cases</Text>
      <Flex pt="10" alignItems="space-between" alignSelf="space-between">
        <Box w="50%">
          <CustomInput
            placeholder="Search By Family Name"
            icon={<Icon as={Search} />}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={handleEnter}
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
  const [contextCases, setContextCases] = useState<{
    [key: string]: CasesContextType;
  }>({
    active: [],
    submitted: [],
    pending: [],
    archived: [],
    searched: [],
  });

  const [searchValue, setSearchValue] = useState("");
  const [enterClicked, setEnterClicked] = useState(false);
  const handleSearch = () => {
    setEnterClicked(true);
    if (searchValue.trim() !== "") {
      IntakeAPIClient.search(searchValue).then((data) => {
        setContextCases({
          active: contextCases.active,
          submitted: contextCases.submitted,
          pending: contextCases.pending,
          archived: contextCases.archived,
          searched: data,
        });
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const activeContextCases = await IntakeAPIClient.get(
        CaseStatus.ACTIVE,
        1,
        20,
      );
      const submittedContextCases = await IntakeAPIClient.get(
        CaseStatus.SUBMITTED,
        1,
        20,
      );
      const pendingContextCases = await IntakeAPIClient.get(
        CaseStatus.PENDING,
        1,
        20,
      );
      const archivedContextCases = await IntakeAPIClient.get(
        CaseStatus.ARCHIVED,
        1,
        20,
      );

      setContextCases({
        active: activeContextCases,
        submitted: submittedContextCases,
        pending: pendingContextCases,
        archived: archivedContextCases,
        searched: [],
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
          <SecondaryHeader
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
          />
          {enterClicked && (
            <>
              {contextCases.searched.length > 0 ? (
                <CasesContext.Provider value={contextCases.searched}>
                  <FilteredSection
                    status="Search Results"
                    showViewAll={false}
                  />
                </CasesContext.Provider>
              ) : (
                <h3 style={{ marginTop: "20px" }}>
                  Sorry, we could not find that for you.
                </h3>
              )}
            </>
          )}
          <CasesContext.Provider value={contextCases.active}>
            <FilteredSection status={CaseStatus.ACTIVE} />
          </CasesContext.Provider>
          <CasesContext.Provider value={contextCases.submitted}>
            <FilteredSection status={CaseStatus.SUBMITTED} />
          </CasesContext.Provider>
          <CasesContext.Provider value={contextCases.pending}>
            <FilteredSection status={CaseStatus.PENDING} />
          </CasesContext.Provider>
          <CasesContext.Provider value={contextCases.archived}>
            <FilteredSection status={CaseStatus.ARCHIVED} />
          </CasesContext.Provider>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
