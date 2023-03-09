import React, { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
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

const Intake = (): React.ReactElement => {
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
    shortTermGoals: "",
    longTermGoals: "",
    familialConcerns: "",
  });

  const [caregivers, setCaregivers] = useState<Caregivers>([]);

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
          <ProgramForm
            programDetails={programDetails}
            setProgramDetails={setProgramDetails}
            nextStep={nextStep}
            setStep={setStep}
          />
        );
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <>
      {step === IntakeSteps.REVIEW_CASE_DETAILS ? (
        <IntakeHeader
          primaryTitle="Review Case Details"
          secondaryTitle="Initiate New Case"
        />
      ) : (
        <>
          {reviewHeader ? (
            <IntakeHeader
              primaryTitle="Edit Case Intake Submission"
              secondaryTitle="Case Management"
            />
          ) : (
            <IntakeHeader
              primaryTitle="Initiate New Case"
              secondaryTitle="Case Management"
            />
          )}
        </>
      )}

      <Box textAlign="center" padding="30px 0 40px 0">
        <Container
          maxWidth="container.xl"
          padding="30px 96px"
          marginBottom="100px"
        >
          {renderDetailsForm()}
        </Container>
      </Box>
    </>
  );
};

export default Intake;
