import { Button, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Edit2 } from "react-feather";
import { Caregivers } from "../../types/CaregiverDetailTypes";
import CourtInformationForm from "./CourtInformationForm";
import IndividualDetails from "./IndividualDetails";
import IntakeFooter from "./IntakeFormFooter";
import { PermittedIndividuals } from "./PermittedIndividualsModal";
import ProgramForm from "./ProgramForm";
import ReferralForm from "./ReferralForm";
import { Children } from "./child-information/AddChildPage";
import IntakeSteps from "./intakeSteps";

type ReviewFormProps = {
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setReviewHeader: React.Dispatch<React.SetStateAction<boolean>>;
  isReviewOnly: boolean;
  setIsReviewOnly: React.Dispatch<React.SetStateAction<boolean>>;
  childrens: Children;
  caregivers: Caregivers;
  permittedIndividuals: PermittedIndividuals;
};

const ReviewForm = ({
  nextStep,
  setStep,
  setReviewHeader,
  isReviewOnly,
  setIsReviewOnly,
  childrens,
  caregivers,
  permittedIndividuals,
}: ReviewFormProps): React.ReactElement => {
  const onNextStep = () => {
    nextStep(); // TODO: Add functionality for nextStep (Currently we pass in empty nextStep() prop)
  };

  const editSectionButton = (targetStep: IntakeSteps): React.ReactElement => {
    return (
      <Button
        textStyle="button-medium"
        variant="primary"
        rightIcon={<Icon as={Edit2} h="16px" />}
        onClick={() => {
          setStep(targetStep);
          setReviewHeader(true);
          setIsReviewOnly(false);
        }}
      >
        Edit
      </Button>
    );
  };

  return (
    <>
      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Case referral
          </Text>
          {editSectionButton(IntakeSteps.CASE_REFERRAL)};
        </HStack>
        <ReferralForm
          nextStep={nextStep}
          setStep={setStep}
          readOnly
          hideFooter
          hideStepper
        />
      </Stack>

      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Court information
          </Text>
          {editSectionButton(IntakeSteps.COURT_INFORMATION)};
        </HStack>
        <CourtInformationForm
          nextStep={nextStep}
          setStep={setStep}
          readOnly
          hideFooter
          hideStepper
        />
      </Stack>

      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Individual details
          </Text>
          {editSectionButton(IntakeSteps.INDIVIDUAL_DETAILS)};
        </HStack>
        <IndividualDetails
          childrenDetails={childrens}
          caregiverDetails={caregivers}
        />
      </Stack>

      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Program details
          </Text>
          {editSectionButton(IntakeSteps.PROGRAM_DETAILS)};
        </HStack>
        <ProgramForm
          nextStep={nextStep}
          setStep={setStep}
          readOnly
          hideFooter
          hideStepper
        />
      </Stack>

      <IntakeFooter
        nextButtonText={isReviewOnly ? "Return to Dashboard" : "Submit case"}
        isStepComplete={() => true} // TODO: validate form
        registrationLoading={false}
        nextStepCallBack={onNextStep}
        childrens={childrens}
        caregivers={caregivers}
        permittedIndividuals={permittedIndividuals}
      />
    </>
  );
};

export default ReviewForm;
