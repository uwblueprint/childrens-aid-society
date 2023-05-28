import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { Archive, FileText } from "react-feather";
import SubmitCaseModal from "./SubmitCaseModal";
import SubmitErrorModal from "./SubmitErrorModal";

export type CurrentStepLayout = {
  nextBtnTxt: string;
  showClearPageBtn: boolean;
};

export type CaseOverviewFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  showClearPageBtn?: boolean;
  isStepComplete: () => boolean;
  registrationLoading: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
};

const CaseOverviewFooter = ({
  nextButtonRef,
  showClearPageBtn,
  isStepComplete,
  registrationLoading,
  nextStepCallBack,
  clearFields,
}: CaseOverviewFooterProps): React.ReactElement => {
  const toast = useToast();
  const history = useHistory();

  const {
    onOpen: onOpenSubmitCase,
    isOpen: isOpenSubmitCase,
    onClose: onCloseSubmitCase,
  } = useDisclosure();

  const {
    isOpen: isOpenSubmitError,
    onClose: onCloseSubmitError,
  } = useDisclosure();

  const onNextStep = () => {
    if (isStepComplete()) {
      nextStepCallBack();
    } else {
      toast({
        title: "Form does not pass validation.",
        description:
          "Please complete all form fields according to requirements.",
        variant: "subtle",
        duration: 3000,
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <Flex
      bg="gray.50"
      boxShadow="sm"
      minH="92px"
      width="100vw"
      align="center"
      justify={{ sm: "center", md: "end" }}
      flexWrap="wrap"
      padding="20px"
      left="0"
      position="fixed"
      bottom="0"
      zIndex="5"
    >
      <ButtonGroup spacing="67rem">
        <Button
          height="38px"
          onClick={() => {
            // TODO: Handle generate report logic
          }}
        >
          <div style={{ paddingRight: "10px" }}>
            <FileText width="13px" />
          </div>
          Generate Report (PDF)
        </Button>
        <Button
          ref={nextButtonRef}
          width={{ sm: "95vw", md: "45vw", lg: "auto" }}
          height="38px"
          background="#94040c"
          isLoading={registrationLoading}
          onClick={() => {
            onNextStep();
          }}
        >
          <div style={{ paddingRight: "10px" }}>
            <FileText width="13px" />
          </div>
          <Box pr="5px">Archive Case</Box>
        </Button>
      </ButtonGroup>

      <SubmitCaseModal
        isOpen={isOpenSubmitCase}
        onClick={() => {
          onNextStep();
        }}
        onClose={onCloseSubmitCase}
      />
      <SubmitErrorModal
        isOpen={isOpenSubmitError}
        onClose={onCloseSubmitError}
      />
    </Flex>
  );
};

export default CaseOverviewFooter;
