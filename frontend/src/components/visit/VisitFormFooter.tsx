import React from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { ArrowRight } from "react-feather";
import SubmitVisitModal from "./SubmitVisitModal";
import VisitAPIClient from "../../APIClients/VisitAPIClient";

export type VisitFormFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  showClearPageBtn?: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
  childDetails: any;
  visitDetails: any;
  attendanceEntries: any;
  transportationEntries: any;
};

const VisitFormFooter = (
  {
    childDetails,
    visitDetails,
    attendanceEntries,
    transportationEntries,
    onCancel
  } : any 
): React.ReactElement => {
  const {
    onOpen: onOpenSubmitVisitModal,
    isOpen: isOpenSubmitVisitModal,
    onClose: onCloseSubmitVisitModal,
  } = useDisclosure();

  const handleSubmit = async () => {
    const visitData = {
      // TODO: Re-assign userID and caseID.
      userID: 1,
      caseID: 1,
      childDetails,
      visitDetails,
      attendanceEntries,
      transportationEntries,
    };
    await VisitAPIClient.post(visitData);

    
    onCloseSubmitVisitModal();
  }

  return (
    <Flex
      bg="white"
      boxShadow="dark-lg"
      minH="92px"
      width="100vw"
      align="center"
      justify="space-between"
      flexWrap="wrap"
      padding="20px"
      position="fixed"
      bottom="0"
      zIndex="2"
    >
      <Button
        onClick={onCancel}
        variant="tertiary"
      >
        <Box>Cancel</Box>
      </Button>

      <div style={{ flex: 1 }} />

      <Button
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="38px"
        variant="primary"
        type="submit"
        onClick={onOpenSubmitVisitModal}
      >
        <Box pl="2" marginRight="10px">
          Visit Log Completed
        </Box>
        <ArrowRight width="13px" />
      </Button>
      <SubmitVisitModal
        isOpen={isOpenSubmitVisitModal}
        onClose={onCloseSubmitVisitModal}
        onClick={handleSubmit}
      />
    </Flex>
  );
};

export default VisitFormFooter;
