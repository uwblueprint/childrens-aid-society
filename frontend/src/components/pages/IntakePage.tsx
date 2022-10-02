import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import CourtInformationForm, {
  CourtDetails,
} from "../intake/CourtInformationForm";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
import PermittedIndividualsForm, {
  PermittedIndividualDetails,
} from "../intake/PermittedIndividualsForm";
import IntakeHeader from "../intake/IntakeHeader";
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
      default:
        return (
          <PermittedIndividualsForm
            permittedIndividualDetails={permittedIndividualDetails}
            setPermittedIndividualDetails={setPermittedIndividualDetails}
            prevStep={prevStep}
          />
        );
    }
  };

  return (
    <>
      <IntakeHeader
        primaryTitle="Initiate New Case"
        secondaryTitle="Case Management"
      />
      <Box textAlign="center" padding="30px 0 40px 0">
        <Stepper
          pages={[
            "Case referral",
            "Court information",
            "Individual details",
            "Program details",
          ]}
          activePage={step - 1}
        />
        {renderDetailsForm()}
      </Box>
    </>
  );
};

export default Intake;
