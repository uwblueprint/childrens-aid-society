import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.png";
import CourtInformationForm, {
  CourtDetails,
} from "../intake/CourtInformationForm";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
import IntakeHeader from "../intake/IntakeHeader";
import ProgramForm, { ProgramDetails } from "../intake/ProgramForm";
import ReviewForm from "../intake/ReviewCaseForm";
import IndividualDetailsEntry from "../intake/IndividualDetailsEntry";
import { Caregivers } from "../intake/NewCaregiverModal";
import IntakeSteps from "../intake/intakeSteps";
import { PermittedIndividuals } from "../intake/PermittedIndividualsModal";
import PermittedIndividualsForm from "../intake/PermittedIndividualsForm";
import UnsavedProgressModal from "../intake/UnsavedProgressModal";
import AddChild from "../intake/child-information/AddChildPage";
import IntakeFooter from "../intake/IntakeFormFooter";

const Intake = (): React.ReactElement => {
  // TODO: remove useHistory once dashboard is implemented
  const history = useHistory();
  const {
    onOpen: onOpenUnsavedProgress,
    isOpen: isOpenUnsavedProgress,
    onClose: onCloseUnsavedProgress,
  } = useDisclosure();

  const [step, setStep] = useState(0);
  const [reviewHeader, setReviewHeader] = useState(false);
  const [referralDetails, setReferralDetails] = useState<ReferralDetails>({
    referringWorker: "",
    referringWorkerContact: "",
    familyName: "",
    referralDate: "",
    cpinFileNumber: "",
    cpinFileType: "",
    phoneNumber: "",
  });
  const [courtDetails, setCourtDetails] = useState<CourtDetails>({
    currentCourtStatus: "",
    firstNationHeritage: "",
    firstNationBand: "",
    orderReferral: null,
  });
  const [programDetails, setProgramDetails] = useState<ProgramDetails>({
    transportationRequirements: "",
    schedulingRequirements: "",
    suggestedStartDate: "",
    shortTermGoals: [],
    longTermGoals: [],
    familialConcerns: [],
  });

  const [caregivers, setCaregivers] = useState<Caregivers>([]);
  const [
    permittedIndividuals,
    setPermittedIndividuals,
  ] = useState<PermittedIndividuals>([]);

  const nextStep = () => setStep(step + 1);

  const renderDetailsForm = () => {
    switch (step) {
      case IntakeSteps.CASE_REFERRAL:
        return (
          <ReferralForm
            referralDetails={referralDetails}
            setReferralDetails={setReferralDetails}
            nextStep={nextStep}
            setStep={setStep}
          />
        );
      case IntakeSteps.COURT_INFORMATION:
        return (
          <CourtInformationForm
            courtDetails={courtDetails}
            setCourtDetails={setCourtDetails}
            nextStep={nextStep}
            setStep={setStep}
          />
        );
      case IntakeSteps.INDIVIDUAL_DETAILS:
        return (
          <IndividualDetailsEntry
            nextStep={nextStep}
            setStep={setStep}
            caregivers={caregivers}
            setCaregivers={setCaregivers}
          />
        );
      case IntakeSteps.PROGRAM_DETAILS:
        return (
          <>
            <ProgramForm
              programDetails={programDetails}
              setProgramDetails={setProgramDetails}
              nextStep={nextStep}
              setStep={setStep}
            />
            <PermittedIndividualsForm
              permittedIndividuals={permittedIndividuals}
              setPermittedIndividuals={setPermittedIndividuals}
            />
          </>
        );
      case IntakeSteps.FORM_COMPLETE:
        return (
          <Box textAlign="center">
            <Center>
              <Image src={Logo} alt="CAS Logo" marginBottom="45px" />
            </Center>
            <Heading size="xl">
              Thank you for completing the intake form
            </Heading>
            <Text>The admin team will review it promptly.</Text>
            <IntakeFooter
              nextButtonText="Return to dashboard"
              isStepComplete={() => true}
              registrationLoading={false}
              nextStepCallBack={() => {}}
            />
          </Box>
        );
      default:
        // IntakeSteps.REVIEW_CASE_DETAILS
        return (
          <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
            <ReviewForm
              referralDetails={referralDetails}
              setReferralDetails={setReferralDetails}
              courtDetails={courtDetails}
              setCourtDetails={setCourtDetails}
              programDetails={programDetails}
              setProgramDetails={setProgramDetails}
              nextStep={nextStep}
              setStep={setStep}
              setReviewHeader={setReviewHeader}
            />
          </Box>
        );
    }
  };

  const renderIntakeHeader = () => {
    switch (step) {
      case IntakeSteps.REVIEW_CASE_DETAILS:
        return (
          <IntakeHeader
            primaryTitle="Review Case Details"
            secondaryTitle="Initiate New Case"
          />
        );
      case IntakeSteps.FORM_COMPLETE:
        return (
          <IntakeHeader
            primaryTitle="Intake Form Complete"
            secondaryTitle="Initiate New Case"
          />
        );
      default:
        return (
          <IntakeHeader
            primaryTitle={
              reviewHeader ? "Edit Case Intake Submission" : "Initiate New Case"
            }
            secondaryTitle="Case Management"
          />
        );
    }
  };

  return (
    <>
      {step === IntakeSteps.ADD_CHILD ? (
        <AddChild setStep={setStep} />
      ) : (
        <>
          {renderIntakeHeader()}
          <Box padding="30px 0 40px 0">
            <Container maxWidth="container.xl" padding="30px 96px">
              {step !== IntakeSteps.REVIEW_CASE_DETAILS &&
                step !== IntakeSteps.FORM_COMPLETE && (
                  <Button
                    leftIcon={<ArrowLeft />}
                    marginBottom="30px"
                    onClick={() => {
                      onOpenUnsavedProgress();
                    }}
                    variant="tertiary"
                  >
                    {reviewHeader
                      ? "Back to Submission Review"
                      : "Back to Dashboard"}
                  </Button>
                )}
              {renderDetailsForm()}
            </Container>
          </Box>
          <UnsavedProgressModal
            isOpen={isOpenUnsavedProgress}
            onClick={() => {
              if (reviewHeader) {
                setStep(IntakeSteps.REVIEW_CASE_DETAILS);
              } else {
                // TODO: remove this once dashboard is implemented
                history.goBack();
              }
            }}
            onClose={onCloseUnsavedProgress}
            reviewVersion={reviewHeader}
          />
        </>
      )}
    </>
  );
};

export default Intake;
