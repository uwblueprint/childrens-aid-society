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

const Intake = (): React.ReactElement => {
  const [step, setStep] = useState(0);
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

  const nextStep = () => setStep(step + 1);

  const renderDetailsForm = () => {
    switch (step) {
      case 0:
        return (
          <ReferralForm
            referralDetails={referralDetails}
            setReferralDetails={setReferralDetails}
            nextStep={nextStep}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <CourtInformationForm
            courtDetails={courtDetails}
            setCourtDetails={setCourtDetails}
            nextStep={nextStep}
            setStep={setStep}
          />
        );
      case 2:
        return <IndividualDetailsEntry nextStep={nextStep} setStep={setStep} />;
      case 3:
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
              />
            </Box>
          </>
        );
    }
  };

  return (
    <>
      {step === 4 ? (
        <IntakeHeader
          primaryTitle="Review Case Details"
          secondaryTitle="Initiate New Case"
        />
      ) : (
        <IntakeHeader
          primaryTitle="Initiate New Case"
          secondaryTitle="Case Management"
        />
      )}

      <Box textAlign="center" padding="30px 0 40px 0">
        <Container maxWidth="container.xl" padding="30px 96px">
          {renderDetailsForm()}
        </Container>
      </Box>
    </>
  );
};

export default Intake;
