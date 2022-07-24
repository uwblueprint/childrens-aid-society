import React, { useState } from "react";
import { Box, Button, Heading, others } from "@chakra-ui/react";
import ReferralForm, { ReferralDetails } from "../intake/ReferralForm";
import PermittedIndividualsForm, { PermittedIndividualDetails } from "../intake/PermittedIndividualsForm";

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
    relationship: "",
    phoneNumber: "",
  });

  const [
    allOtherPermittedIndividuals,
    setAllOtherPermittedIndividuals,
  ] = useState<PermittedIndividualDetails[]>([]);

  const [otherScreens, setOtherScreens] = useState<React.ReactElement[]>([]);

  // TODO: make so that previous and next auto saves the allOtherPermittedIndividuals
  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  // TODO: make it so that it adds new components on same page
  const addOtherIndividuals = () => {
    setAllOtherPermittedIndividuals([
      ...allOtherPermittedIndividuals,
      permittedIndividualDetails,
    ]);
    setOtherScreens([
      ...otherScreens,
      <PermittedIndividualsForm
        key={otherScreens.length}
        permittedIndividualDetails={permittedIndividualDetails}
        setPermittedIndividualDetails={setPermittedIndividualDetails}
      />,
    ]);
    setPermittedIndividualDetails({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      relationship: "",
    });
    nextStep();
  };

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
          <Button onClick={prevStep}>Previous Button</Button>
          <Button onClick={nextStep}>Next Button</Button>
        </Box>
      );
    default:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <PermittedIndividualsForm
            key={otherScreens.length - 1}
            permittedIndividualDetails={permittedIndividualDetails}
            setPermittedIndividualDetails={setPermittedIndividualDetails}
          />
          <Button onClick={addOtherIndividuals}>Add</Button>
          <Button onClick={prevStep}>Previous Button</Button>
          <Button onClick={nextStep}>Next Button</Button>
        </Box>
      );
  }
};

export default Intake;
