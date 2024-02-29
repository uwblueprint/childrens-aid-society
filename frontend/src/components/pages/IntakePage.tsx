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
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Caregivers } from "../../types/CaregiverDetailTypes";
import CourtInformationForm from "../intake/CourtInformationForm";
import IndividualDetailsEntry from "../intake/IndividualDetailsEntry";
import IntakeHeader from "../intake/IntakeHeader";
import PermittedIndividualsForm from "../intake/PermittedIndividualsForm";
import { PermittedIndividuals } from "../intake/PermittedIndividualsModal";
import ProgramForm from "../intake/ProgramForm";
import ReferralForm from "../intake/ReferralForm";
import ReviewForm from "../intake/ReviewCaseForm";
import UnsavedProgressModal from "../intake/UnsavedProgressModal";
import AddChild, { Children } from "../intake/child-information/AddChildPage";
import IntakeSteps from "../intake/intakeSteps";
// eslint-disable-next-line import/no-named-as-default
import { useStepValueContext } from "../../contexts/IntakeValueContext";
import IntakeFooter from "../intake/IntakeFormFooter";
import { Providers } from "../intake/NewProviderModal";

const Intake = (): React.ReactElement => {
  // TODO: remove useHistory once dashboard is implemented
  const history = useHistory();
  const {
    onOpen: onOpenUnsavedProgress,
    isOpen: isOpenUnsavedProgress,
    onClose: onCloseUnsavedProgress,
  } = useDisclosure();

  const { step, setStep } = useStepValueContext();
  const { isReviewOnly, setIsReviewOnly } = useStepValueContext();
  const { referralDetails, setReferralDetails } = useStepValueContext();
  const { courtDetails, setCourtDetails } = useStepValueContext();
  const { programDetails, setProgramDetails } = useStepValueContext();

  const [reviewHeader, setReviewHeader] = useState(false);
  const [children, setChildren] = useState<Children>([]);
  const [caregivers, setCaregivers] = useState<Caregivers>([]);
  const [
    permittedIndividuals,
    setPermittedIndividuals,
  ] = useState<PermittedIndividuals>([]);
  const [allProviders, setAllProviders] = useState<Providers>([]);
  const [selectedIndexChild, setSelectedIndexChild] = useState(-1);

  const nextStep = () => {
    if (isReviewOnly) {
      setIsReviewOnly(false);
      history.push("/");
    } else {
      setStep(step + 1);
    }
  };

  const renderDetailsForm = () => {
    switch (step) {
      default:
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
            childrens={children}
            setChildren={setChildren}
            caregivers={caregivers}
            setCaregivers={setCaregivers}
            selectedIndexChild={selectedIndexChild}
            setSelectedIndexChild={setSelectedIndexChild}
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
      case IntakeSteps.REVIEW_CASE_DETAILS:
        return (
          <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
            {/* This is the source of the review */}
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
              isReviewOnly={isReviewOnly}
              setIsReviewOnly={setIsReviewOnly}
              childrens={children}
              caregivers={caregivers}
              permittedIndividuals={permittedIndividuals}
            />
          </Box>
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
              referralDetails={referralDetails}
              courtDetails={courtDetails}
              programDetails={programDetails}
              childrens={children}
              caregivers={caregivers}
              permittedIndividuals={permittedIndividuals}
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
        <AddChild
          allProviders={allProviders}
          setAllProviders={setAllProviders}
          setStep={setStep}
          childrens={children}
          setChildren={setChildren}
          selectedIndexChild={selectedIndexChild}
        />
      ) : (
        <>
          {renderIntakeHeader()}
          <Box padding="30px 0 160px 0">
            <Container maxWidth="container.xl" padding="30px 96px">
              {step !== IntakeSteps.REVIEW_CASE_DETAILS ? (
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
                )
              ) : (
                <Button
                  leftIcon={<ArrowLeft />}
                  onClick={() => {
                    onOpenUnsavedProgress();
                  }}
                  variant="tertiary"
                >
                  Back to Dashboard
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
