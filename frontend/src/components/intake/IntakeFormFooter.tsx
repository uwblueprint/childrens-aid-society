import React from "react";
import { ArrowRight } from "react-feather";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";

export type CurrentStepLayout = {
  nextBtnTxt: string;
  showClearPageBtn: boolean;
};

export type IntakeFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  nextButtonText: string;
  showClearPageBtn?: boolean;
  isStepComplete: () => boolean;
  registrationLoading: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
};

const IntakeFooter = ({
  nextButtonRef,
  nextButtonText,
  showClearPageBtn,
  isStepComplete,
  registrationLoading,
  nextStepCallBack,
  clearFields,
}: IntakeFooterProps): React.ReactElement => {
  const toast = useToast();

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
      {showClearPageBtn && (
        <Button
          width={{ sm: "95vw", md: "45vw", lg: "auto" }}
          variant="tertiary"
          height="48px"
          mb={{ sm: 4, md: 0 }}
          mr={{ sm: 0, md: 4 }}
          onClick={() => {
            if (clearFields) {
              clearFields();
            }
          }}
        >
          Clear page
        </Button>
      )}

      <Button
        ref={nextButtonRef}
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="48px"
        loadingText="Submitting"
        type="submit"
        isLoading={registrationLoading}
        onClick={() => {
          onNextStep();
        }}
      >
        <Box pr="5px">{nextButtonText}</Box>
        <ArrowRight />
      </Button>
    </Flex>
  );
};

export default IntakeFooter;
