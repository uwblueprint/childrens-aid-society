import React from "react";
import { Button, Flex, useToast } from "@chakra-ui/react";

export type CurStepLayout = {
  nextBtnTxt: string;
  showClearPageBtn: boolean;
};

export type IntakeFooterProps = {
  nextBtnRef?: React.RefObject<HTMLButtonElement>;
  currentStep: number;
  curStepLayout: Map<number, CurStepLayout>;
  isStepComplete: () => boolean;
  registrationLoading: boolean;
  nextStepCallBack: () => void;
};

const IntakeFooter = ({
  nextBtnRef,
  currentStep,
  curStepLayout,
  isStepComplete,
  registrationLoading,
  nextStepCallBack,
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
      position="fixed"
      bottom="0"
      zIndex="5"
    >
      {curStepLayout.get(currentStep)?.showClearPageBtn ? (
        <Button
          width={{ sm: "95vw", md: "45vw", lg: "auto" }}
          variant="tertiary"
          height="48px"
          mb={{ sm: 4, md: 0 }}
          mr={{ sm: 0, md: 4 }}
        >
          Clear page
        </Button>
      ) : (
        ""
      )}

      <Button
        ref={nextBtnRef}
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="48px"
        loadingText="Submitting"
        type="submit"
        isLoading={registrationLoading}
        onClick={() => {
          onNextStep();
        }}
      >
        {curStepLayout.get(currentStep)?.nextBtnTxt}
      </Button>
    </Flex>
  );
};

export default IntakeFooter;
