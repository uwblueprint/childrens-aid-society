import React, { useContext, useEffect, useState } from "react";
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
import FilteredSection from "../dashboard/FilteredSection";
import StatusModal from "../dashboard/StatusModal";
import PermanentDeleteModal from "../dashboard/PermanentDeleteModal";
import CaseCard, { CaseCardProps } from "../dashboard/CaseCard";
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";
import CasesContext from "../../contexts/CasesContext";
import { Case } from "../../types/CasesContextTypes";

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

  function goToIntake() {
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
    <Box>
      <Text textStyle="header-large">Intake Cases</Text>
      <Flex pt="10">
        <Box w="20%">
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

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      IntakeAPIClient.get(searchValue).then((data) => {
        // Assuming the API response is an array of objects as shown in the example data
        // Map through the response and transform it into an array of CaseCardProps objects
        const caseCards: CaseCardProps[] = data.map((caseData: any) => ({
          caseTitle: caseData.cpin_number, // Use appropriate properties here
          caseLead: caseData.referring_worker_name,
          date: caseData.referral_date,
          familyName: caseData.family_name,
          caseTag: caseData.intake_status as CaseStatus,
        }));
        setSearchResults(caseCards);
      });
    } else {
      setSearchResults([]);
    }
  };

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
        caseLead: intake.caseReferral.referringWorkerName,
        date: intake.caseReferral.referralDate,
        familyName: intake.caseReferral.familyName,
        caseTag: intake.intakeStatus,
      }));
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const activeCases = await IntakeApiClient.get(CaseStatus.ACTIVE, 1, 20);
      const submittedCases = await IntakeApiClient.get(
        CaseStatus.SUBMITTED,
        1,
        20,
      );
      const pendingCases = await IntakeApiClient.get(CaseStatus.PENDING, 1, 20);
      const archivedCases = await IntakeApiClient.get(
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
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="100px" py="60px">
        <SecondaryHeader
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />

        <VStack spacing={15} align="stretch" my={12}>
          {searchResults.length > 0 ? (
            <FilteredSection status="Search Results" cases={searchResults} />
          ) : (
            <>
              <FilteredSection
                status={CaseStatus.ACTIVE}
                cases={cases.active}
              />
              <FilteredSection
                status={CaseStatus.SUBMITTED}
                cases={cases.submitted}
              />
              <FilteredSection
                status={CaseStatus.PENDING}
                cases={cases.pending}
              />
              <FilteredSection
                status={CaseStatus.ARCHIVED}
                cases={cases.archived}
              />
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
