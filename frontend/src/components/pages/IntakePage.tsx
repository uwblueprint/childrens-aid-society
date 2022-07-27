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

  const renderFormPage = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          <ReferralForm
            referralDetails={referralDetails}
            setReferralDetails={setReferralDetails}
          />
        );
      case 2:
        return <Heading textStyle="header-large">Intake 💨 2</Heading>;
      default:
        return <Heading textStyle="header-large">Intake 💨 3</Heading>;
    }
  };

  return (
    <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
      {renderFormPage(step)}
      {step > 1 && <Button onClick={prevStep}>Previous Button</Button>}
      {step < 3 && <Button onClick={nextStep}>Next Button</Button>}
    </Box>
  );
};

export default Intake;
