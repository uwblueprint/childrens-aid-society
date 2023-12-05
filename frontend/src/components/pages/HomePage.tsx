import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FilePlus, Search } from "react-feather";
import CustomInput from "../common/CustomInput";
import IntakeHeader from "../intake/IntakeHeader";
import CaseStatus from "../../types/CaseStatus";
import StatusModal from "../dashboard/StatusModal";
import PermanentDeleteModal from "../dashboard/PermanentDeleteModal";
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";
import FilteredSection from "../dashboard/FilteredSection";
import caseCard, { CaseCardProps } from "../dashboard/CaseCard";
import CasesContext from "../../contexts/CasesContext";
import { Case } from "../../types/CasesContextTypes";
import { useStepValueContext } from "../../contexts/IntakeValueContext";

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

  function goToIntake() {
    setStep(0);
    history.push("/intake");
  }

  const {
    onOpen: onOpenPermanentDelete,
    isOpen: isOpenPermanentDelete,
    onClose: onClosePermanentDelete,
  } = useDisclosure();

  const {
    onOpen: onOpenStatusModal,
    isOpen: isOpenStatusModal,
    onClose: onCloseStatusModal,
  } = useDisclosure();

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
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<CaseCardProps[]>([]);
  const [enterClicked, setEnterClicked] = useState(false);
  const handleSearch = () => {
    setEnterClicked(true);
    if (searchValue.trim() !== "") {
      IntakeAPIClient.search(searchValue).then((data) => {
        const caseCards: CaseCardProps[] = data.map((caseData: any) => ({
          caseId: caseData.case_id,
          referringWorker: caseData.caseReferral.referringWorkerName,
          date: caseData.caseReferral.referralDate,
          familyName: caseData.caseReferral.familyName,
          caseTag: caseData.intakeStatus,
        }));
        setSearchResults(caseCards);
      });
    }
  };

  // TODO: remove console log and use context instead of state
  const casesFromContext = useContext(CasesContext);
  // eslint-disable-next-line
  console.log(casesFromContext);

  const [cases, setCases] = useState<{ [key: string]: CaseCardProps[] }>({
    active: [],
    submitted: [],
    pending: [],
    archived: [],
  });

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
      const activeCases = await IntakeAPIClient.get(CaseStatus.ACTIVE, 1, 20);
      const submittedCases = await IntakeAPIClient.get(
        CaseStatus.SUBMITTED,
        1,
        20,
      );
      const pendingCases = await IntakeAPIClient.get(CaseStatus.PENDING, 1, 20);
      const archivedCases = await IntakeAPIClient.get(
        CaseStatus.ARCHIVED,
        1,
        20,
      );

      setCases({
        active: mapIntakeResponsesToCaseCards(activeCases),
        submitted: mapIntakeResponsesToCaseCards(submittedCases),
        pending: mapIntakeResponsesToCaseCards(pendingCases),
        archived: mapIntakeResponsesToCaseCards(archivedCases),
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
          {enterClicked &&
            (console.log("enteredClicked: ", enterClicked),
            (
              <>
                {searchResults.length > 0 ? (
                  <FilteredSection
                    status="Search Results"
                    cases={searchResults}
                  />
                ) : (
                  <h3 style={{ marginTop: "20px" }}>
                    Sorry, we couldn`t find that for you.
                  </h3>
                )}
              </>
            ))}
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
