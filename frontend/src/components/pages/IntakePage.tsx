import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import CourtInformationForm, {
  CourtDetails,
} from "../intake/CourtInformationForm";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
import PermittedIndividualsForm, {
  PermittedIndividualDetails,
} from "../intake/PermittedIndividualsForm";
import IntakeHeader, { IntakeHeaderText } from "../intake/IntakeHeader";

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

  const intakeReferralText:IntakeHeaderText = {
    primaryTitle: "Initate New Case",
    secondaryTitle: "Case Management",
  };
  const intakeCourseDetailsText:IntakeHeaderText = {
    primaryTitle: "Initate New Case",
    secondaryTitle: "Case Management",
  };
  const intakePermittedIndividualText:IntakeHeaderText = {
    primaryTitle: "Initate New Case",
    secondaryTitle: "Case Management",
  };
  

  const renderDetailsForm = () => {
    switch (step) {
      case 1:
        return (
          <>
          <IntakeHeader intakeHeaderText={intakeReferralText} />
          <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
            <ReferralForm
              referralDetails={referralDetails}
              setReferralDetails={setReferralDetails}
              nextStep={nextStep}
            />
          </Box>
          </>
        );
      case 2:
        return (
          <>
          <IntakeHeader intakeHeaderText={intakeCourseDetailsText} />
          <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
            <CourtInformationForm
              courtDetails={courtDetails}
              setCourtDetails={setCourtDetails}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </Box>
          </>
        );
      default:
        return (
          <>
          <IntakeHeader intakeHeaderText={intakePermittedIndividualText} />
          <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
            <PermittedIndividualsForm
              permittedIndividualDetails={permittedIndividualDetails}
              setPermittedIndividualDetails={setPermittedIndividualDetails}
              prevStep={prevStep}
            />
          </Box>
          </>
        );
    }
  };

  return (
    <>
      {renderDetailsForm()}
    </>
  );
};

export default Intake;
