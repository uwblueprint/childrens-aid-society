import React, { useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
import PermittedIndividualsForm, {
  PermittedIndividualDetails,
} from "../intake/PermittedIndividualsForm";

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
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <Heading textStyle="heading">Intake 💨 2</Heading>
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
          <Button>Add</Button>
        </Box>
      );
  }
};

export default Intake;
