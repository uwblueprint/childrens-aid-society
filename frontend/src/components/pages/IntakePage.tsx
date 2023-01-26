import React, { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import CourtInformationForm, {
  CourtDetails,
} from "../intake/CourtInformationForm";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
import IntakeHeader from "../intake/IntakeHeader";
import ProgramForm, { ProgramDetails } from "../intake/ProgramForm";
import ReviewForm from "../intake/ReviewCaseForm";
import Stepper from "../intake/Stepper";
import IntakeFooter, { CurStepLayout } from "../intake/IntakeFormFooter";
import IndividualDetailsEntry from "../intake/IndividualDetailsEntry";

enum IntakeSteps {
  CASE_REFERAL,
  COURT_INFORMATION,
  INDIVIDUAL_DETAILS,
  PROGRAM_DETAILS,
  REVIEW_CASE_DETAILS,
}

const intakeStepLayout = new Map<IntakeSteps, CurStepLayout>();
intakeStepLayout.set(IntakeSteps.CASE_REFERAL, {
  nextBtnTxt: "Next Section",
  showClearPageBtn: true,
});
intakeStepLayout.set(IntakeSteps.COURT_INFORMATION, {
  nextBtnTxt: "Next Section",
  showClearPageBtn: true,
});
intakeStepLayout.set(IntakeSteps.INDIVIDUAL_DETAILS, {
  nextBtnTxt: "Next Section",
  showClearPageBtn: true,
});
intakeStepLayout.set(IntakeSteps.PROGRAM_DETAILS, {
  nextBtnTxt: "Review case details",
  showClearPageBtn: false,
});

const Intake = (): React.ReactElement => {
  const [step, setStep] = useState<IntakeSteps>(IntakeSteps.CASE_REFERAL);
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
    test: "",
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
          />
        );
      case 1:
        return (
          <CourtInformationForm
            courtDetails={courtDetails}
            setCourtDetails={setCourtDetails}
          />
        );
      case 2:
        return <IndividualDetailsEntry />;
      case 3:
        return (
          <>
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <ProgramForm
                programDetails={programDetails}
                setProgramDetails={setProgramDetails}
              />
            </Box>
          </>
        );
      default:
        return (
          <>
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <ReviewForm />
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

      <Box
        textAlign="center"
        padding="30px 0 40px 0"
        pb={{ sm: "170px", md: "128px", lg: "184px" }}
      >
        {step !== 4 ? (
          <Stepper
            pages={[
              { name: "Case referral" },
              { name: "Court information" },
              { name: "Individual details" },
              { name: "Program details" },
            ]}
            setStep={setStep}
            activePage={step}
          />
        ) : (
          <></>
        )}
        <Container maxWidth="container.xl" padding="30px 96px">
          {renderDetailsForm()}
        </Container>
      </Box>
      <IntakeFooter
        currentStep={step}
        curStepLayout={intakeStepLayout}
        isStepComplete={() => true}
        registrationLoading={false}
        nextStepCallBack={nextStep}
      />
    </>
  );
};

export default Intake;
