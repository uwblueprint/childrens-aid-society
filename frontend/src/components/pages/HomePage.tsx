import React from "react";
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
import FilteredSection from "../dashboard/FilteredSection";
import StatusModal from "../dashboard/StatusModal";
import PermanentDeleteModal from "../dashboard/PermanentDeleteModal";
import { CaseCardProps } from "../dashboard/CaseCard";

const SecondaryHeader = (): React.ReactElement => {
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

  return (
    <Box>
      <Text textStyle="header-large">Intake Cases</Text>
      <Flex pt="10">
        <Box w="20%">
          <CustomInput
            placeholder="Search By Family Name"
            icon={<Icon as={Search} />}
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

        <Button
          height="100%"
          px="2"
          rounded="lg"
          border="1px"
          onClick={onOpenStatusModal}
        >
          Test Status Modal
        </Button>

        <PermanentDeleteModal
          isOpen={isOpenPermanentDelete}
          onClick={() => {
            // TODO: add deletion logic
            onClosePermanentDelete();
            onCloseStatusModal();
          }}
          onClose={onClosePermanentDelete}
          intakeId={2} // TODO implement so that this componet gets passed in real intakeId
        />
        {/* //TODO: dynamically pass in case details 
        and add onClick save functionality */}
        <StatusModal
          caseId={1}
          status="ARCHIVED"
          isOpen={isOpenStatusModal}
          onClick={() => {}}
          onClose={onCloseStatusModal}
          onDeleteClick={onOpenPermanentDelete}
          goToIntake={goToIntake}
        />
      </Flex>
    </Box>
  );
};

const Home = (): React.ReactElement => {
  const cases: { [key: string]: CaseCardProps[] } = {
    active: [
      {
        caseId: 1,
        caseLead: "Case Lead",
        date: "11/06/2023",
        familyName: "Family Name",
        caseTag: CaseStatus.ACTIVE,
      },
      {
        caseId: 2,
        caseLead: "Case Lead",
        date: "11/06/2023",
        familyName: "Family Name",
        caseTag: CaseStatus.ACTIVE,
      },
      {
        caseId: 3,
        caseLead: "Case Lead",
        date: "11/06/2023",
        familyName: "Family Name",
        caseTag: CaseStatus.ACTIVE,
      },
      {
        caseId: 4,
        caseLead: "Case Lead",
        date: "11/06/2023",
        familyName: "Family Name",
        caseTag: CaseStatus.ACTIVE,
      },
    ],
    submitted: [
      {
        caseId: 5,
        caseLead: "Case Lead",
        date: "11/06/2023",
        familyName: "Family Name",
        caseTag: CaseStatus.SUBMITTED,
      },
    ],
    pending: [
      {
        caseId: 1,
        caseLead: "Case Lead",
        date: "11/06/2023",
        familyName: "Family Name",
        caseTag: CaseStatus.PENDING,
      },
    ],
    archived: [
      {
        caseId: 1,
        caseLead: "Case Lead",
        date: "11/06/2023",
        familyName: "Family Name",
        caseTag: CaseStatus.ARCHIVED,
      },
    ],
  };
  return (
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="100px" py="60px">
        <SecondaryHeader />
        <VStack spacing={15} align="stretch" my={12}>
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
