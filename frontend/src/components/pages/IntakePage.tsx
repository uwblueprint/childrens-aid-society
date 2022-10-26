import React, { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import CourtInformationForm, {
  CourtDetails,
} from "../intake/CourtInformationForm";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
import PermittedIndividualsForm, {
  PermittedIndividualDetails,
} from "../intake/PermittedIndividualsForm";
import IntakeHeader from "../intake/IntakeHeader";
import ProgramForm, { ProgramDetails } from "../intake/ProgramForm";
import ReviewForm from "../intake/ReviewCaseForm";
import Stepper from "../intake/Stepper";

const Intake = (): React.ReactElement => {
  const [step, setStep] = useState(1);
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
  const [
    permittedIndividualDetails,
    setPermittedIndividualDetails,
  ] = useState<PermittedIndividualDetails>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    relationship: "",
  });
  const [programDetails, setProgramDetails] = useState<ProgramDetails>({
    test: "",
  });

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  const renderDetailsForm = () => {
    switch (step) {
      case 1:
        return (
          <ReferralForm
            referralDetails={referralDetails}
            setReferralDetails={setReferralDetails}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <CourtInformationForm
            courtDetails={courtDetails}
            setCourtDetails={setCourtDetails}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <>
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <PermittedIndividualsForm
                permittedIndividualDetails={permittedIndividualDetails}
                setPermittedIndividualDetails={setPermittedIndividualDetails}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </Box>
          </>
        );
      case 4:
        return (
          <>
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <ProgramForm
                programDetails={programDetails}
                setProgramDetails={setProgramDetails}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </Box>
          </>
        );
      default:
        return (
          <>
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <ReviewForm prevStep={prevStep} />
            </Box>
          </>
        );
    }
  };

  return (
    <>
      {step === 5 ? (
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
        {step !== 5 ? (
          <Stepper
            pages={[
              "Case referral",
              "Court information",
              "Individual details",
              "Program details",
            ]}
            activePage={step - 1}
          />
        ) : (
          <></>
        )}
        <Container maxWidth="container.xl" padding="30px 96px">
          {renderDetailsForm()}
        </Container>
      </Box>
    </>
  );
};

export default Intake;
