<<<<<<< HEAD
import React, {useState} from "react";
import { Button, Text, Box, Heading } from "@chakra-ui/react";
import CourtInformationForm, {CourtDetails} from "../intake/CourtInformationForm";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
=======
import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import CourtInformationForm, {
  CourtDetails,
} from "../intake/CourtInformationForm";
>>>>>>> d7381f0... rebuilt frontend container and updated nits/style

const Intake = (): React.ReactElement => {
  const [step, setStep] = useState(1);
  const [courtDetails, setCourtDetails] = useState<CourtDetails>({
    currentCourtStatus: "",
    firstNationHeritage: "",
    firstNationBand: "",
  });
  const [referralDetails, setReferralDetails] = useState<ReferralDetails>({
    referringWorker: "",
    referringWorkerContact: "",
    familyName: "",
    referralDate: "",
    cpinFileNumber: "",
    cpinFileType: "",
    phoneNumber: "", });

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return (
        <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
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
          <Heading textStyle="heading">Intake 💨 2</Heading>

          <CourtInformationForm
            courtDetails={courtDetails}
            setCourtDetails={setCourtDetails}
          />
          <Text textStyle="heading">Intake 💨 2</Text>
          <Button onClick={prevStep}>Previous Button</Button>
          <Button onClick={nextStep}>Next Button</Button>
        </Box>
      );
    default:
      return (
        <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
          <Heading textStyle="heading">Intake 💨 3</Heading>
          <Button onClick={prevStep}>Previous Button</Button>
        </Box>
      );
  }
};

export default Intake;
