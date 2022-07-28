import React, { useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";

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

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return (
        <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
          <ReferralForm
            setReferralDetails={setReferralDetails}
            nextStep={nextStep}
          />
        </Box>
      );
    case 2:
      return (
        <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
          <Heading textStyle="header-large">Intake 💨 2</Heading>
          <Button onClick={prevStep}>Previous Button</Button>
          <Button onClick={nextStep}>Next Button</Button>
        </Box>
      );
    default:
      return (
        <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
          <Heading textStyle="header-large">Intake 💨 3</Heading>
          <Button onClick={prevStep}>Previous Button</Button>
        </Box>
      );
  }
};

export default Intake;
