import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FilePlus, Search } from "react-feather";
import CustomInput from "../common/CustomInput";
import IntakeHeader from "../intake/IntakeHeader";
import StatusModal from "../dashboard/StatusModal";
import PermanentDeleteModal from "../dashboard/PermanentDeleteModal";

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
        />
        {/* //TODO: dynamically pass in case details 
        and add onClick save functionality */}
        <StatusModal
          caseNumber={1}
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
  return (
    <Box>
      <IntakeHeader
        primaryTitle="Children's Aid Society of Algoma"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="100px" pt="60px">
        <SecondaryHeader />
      </Box>
    </Box>
  );
};

export default Home;
