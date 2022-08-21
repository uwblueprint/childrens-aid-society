import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
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
  const [intakeHeaderText, setIntakeHeaderText] = useState<IntakeHeaderText>({
    biggerMainTitle: "Initate New Case",
    smallerTopTitle: "Case Management",
  });
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
  const [
    allOtherPermittedIndividuals,
    setAllOtherPermittedIndividuals,
  ] = useState<PermittedIndividualDetails[]>([]);

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  const addOtherIndividuals = () =>
    setAllOtherPermittedIndividuals([
      ...allOtherPermittedIndividuals,
      permittedIndividualDetails,
    ]);

  const renderDetailsForm = () => {
  switch (step) {
    case 1:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <ReferralForm
            referralDetails={referralDetails}
            setReferralDetails={setReferralDetails}
          />
          <Button onClick={nextStep}>Next Button</Button>
        </Box>
      );
    case 2:
      return (
        <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
          <CourtInformationForm
            courtDetails={courtDetails}
            setCourtDetails={setCourtDetails}
          />
          <Button onClick={prevStep}>Previous Button</Button>
          <Button onClick={nextStep}>Next Button</Button>
        </Box>
      );
    default:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <PermittedIndividualsForm
            permittedIndividualDetails={permittedIndividualDetails}
            setPermittedIndividualDetails={setPermittedIndividualDetails}
          />
          <Button onClick={prevStep}>Previous Button</Button>
          <Button onClick={addOtherIndividuals}>Add</Button>
        </Box>
      );
  }
};
return(
  <>
  <IntakeHeader intakeHeaderText={intakeHeaderText}/>
  {renderDetailsForm()}
  </>
)
};

export default Intake;
