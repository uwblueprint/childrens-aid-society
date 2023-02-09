import React from "react";
import { Button, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Edit2 } from "react-feather";
import IndividualDetails from "./IndividualDetails";
import ReferralForm, { ReferralDetails } from "./ReferralForm";
import CourtInformationForm, { CourtDetails } from "./CourtInformationForm";
import ProgramForm, { ProgramDetails } from "./ProgramForm";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";

type ReviewFormProps = {
  referralDetails: ReferralDetails;
  setReferralDetails: React.Dispatch<React.SetStateAction<ReferralDetails>>;
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  nextStep: () => void;
  prevStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setReviewHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({
  referralDetails,
  setReferralDetails,
  courtDetails,
  setCourtDetails,
  programDetails,
  setProgramDetails,
  nextStep,
  prevStep,
  setStep,
  setReviewHeader,
}: ReviewFormProps): React.ReactElement => {
  const onNextStep = () => {
    nextStep(); // TODO: Add functionality for nextStep (Currently we pass in empty nextStep() prop)
  };

  return (
    <>
      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Case referral
          </Text>
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
            onClick={() => {
              setStep(IntakeSteps.CASE_REFERRAL);
              setReviewHeader(true);
            }}
          >
            Edit
          </Button>
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
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
            onClick={() => {
              setStep(IntakeSteps.COURT_INFORMATION);
              setReviewHeader(true);
            }}
          >
            Edit
          </Button>
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
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
            onClick={() => {
              setStep(IntakeSteps.INDIVIDUAL_DETAILS);
              setReviewHeader(true);
            }}
          >
            Edit
          </Button>
        </HStack>
        <IndividualDetails
          title="Individual details"
          childrenDetails={[]}
          caregiverDetails={[]}
        />
      </Stack>

      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Program details
          </Text>
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
            onClick={() => {
              setStep(IntakeSteps.PROGRAM_DETAILS);
              setReviewHeader(true);
            }}
          >
            Edit
          </Button>
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
        currentStep={IntakeSteps.REVIEW_CASE_DETAILS}
        nextButtonText="Submit case"
        isStepComplete={() => true} // TODO: validate form
        registrationLoading={false}
        nextStepCallBack={onNextStep}
      />
    </>
  );
};

export default ReviewForm;
