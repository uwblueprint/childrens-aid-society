import React from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { ArrowRight } from "react-feather";
import SubmitVisitModal from "./SubmitVisitModal";

export type VisitFormFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  showClearPageBtn?: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
};

const VisitFormFooter = (): React.ReactElement => {
  const {
    onOpen: onOpenSubmitVisitModal,
    isOpen: isOpenSubmitVisitModal,
    onClose: onCloseSubmitVisitModal,
  } = useDisclosure();

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
        onClick={() => {
          // TODO: Handle cancel form logic
        }}
        variant="tertiary"
      >
        <Box>Cancel</Box>
      </Button>

      <div style={{ flex: 1 }} />

      <Button
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="38px"
        variant="primary"
        // TODO add isLoading={}
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
        onClick={onOpenSubmitVisitModal}
      />
    </Flex>
  );
};

export default VisitFormFooter;
