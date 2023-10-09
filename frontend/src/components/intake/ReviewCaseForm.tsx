import React from "react";
import { Button, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Edit2 } from "react-feather";
import IndividualDetails from "./IndividualDetails";
import ReferralForm, { ReferralDetails } from "./ReferralForm";
import CourtInformationForm, { CourtDetails } from "./CourtInformationForm";
import ProgramForm, { ProgramDetails } from "./ProgramForm";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";
import { Children } from "./child-information/AddChildPage";
import { Caregivers } from "./NewCaregiverModal";

type ReviewFormProps = {
  referralDetails: ReferralDetails;
  setReferralDetails: React.Dispatch<React.SetStateAction<ReferralDetails>>;
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setReviewHeader: React.Dispatch<React.SetStateAction<boolean>>;
  isReviewOnly: boolean;
  setIsReviewOnly: React.Dispatch<React.SetStateAction<boolean>>;
  childrens: Children;
  caregivers: Caregivers;
};

const ReviewForm = ({
  referralDetails,
  setReferralDetails,
  courtDetails,
  setCourtDetails,
  programDetails,
  setProgramDetails,
  nextStep,
  setStep,
  setReviewHeader,
  isReviewOnly,
  setIsReviewOnly,
  childrens,
  caregivers,
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
          referralDetails={referralDetails}
          setReferralDetails={setReferralDetails}
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
          courtDetails={courtDetails}
          setCourtDetails={setCourtDetails}
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
          programDetails={programDetails}
          setProgramDetails={setProgramDetails}
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
      />
    </>
  );
};

export default ReviewForm;
