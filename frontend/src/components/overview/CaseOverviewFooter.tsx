import React from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { FileText } from "react-feather";
import ArchiveCaseModal from "../dashboard/ArchiveCaseModal";

export type CaseOverviewFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  showClearPageBtn?: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
};

const CaseOverviewFooter = (): React.ReactElement => {
  const {
    onOpen: onOpenArchiveCaseModal,
    isOpen: isOpenArchiveCaseModal,
    onClose: onCloseArchiveCaseModal,
  } = useDisclosure();

  return (
    <Flex
      bg="gray.50"
      boxShadow="sm"
      minH="92px"
      width="100vw"
      align="center"
      justify="space-between" //
      flexWrap="wrap"
      padding="20px"
      left="0"
      position="fixed"
      bottom="0"
    >
      <Button
        onClick={() => {
          // TODO: Handle generate report logic
        }}
      >
        <FileText width="13px" />
        <Box pl="2">Generate Report (PDF)</Box>
      </Button>

      <Button
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="38px"
        variant="delete"
        // TODO add isLoading={}
        onClick={onOpenArchiveCaseModal}
      >
        <FileText width="13px" />
        <Box pl="2">Archive Case</Box>
      </Button>
      <ArchiveCaseModal
        intakeID={1} // TODO add isLoading
        isOpen={isOpenArchiveCaseModal}
        onClose={onCloseArchiveCaseModal}
        caseName="Case 1"
      />
    </Flex>
  );
};

export default CaseOverviewFooter;
