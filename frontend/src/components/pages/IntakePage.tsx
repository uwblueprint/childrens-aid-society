import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import ReferralForm from "../intake/ReferralForm";

const Intake = (): React.ReactElement => {
  const [step, setStep] = useState(1);
  const [referralDetails, setReferralDetails] = useState({});

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <ReferralForm
            referralDetails={referralDetails}
            setReferralDetails={setReferralDetails}
          />
          <Text textStyle="heading">Intake 💨 1 </Text>
          <Button onClick={nextStep}>Next Button</Button>
        </div>
      );
    case 2:
      return (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <Text textStyle="heading">Intake 💨 2</Text>
          <Button onClick={prevStep}>Previous Button</Button>
          <Button onClick={nextStep}>Next Button</Button>
        </div>
      );
    default:
      return (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <Text textStyle="heading">Intake 💨 3</Text>
          <Button onClick={prevStep}>Previous Button</Button>
        </div>
      );
  }
};

export default Intake;
