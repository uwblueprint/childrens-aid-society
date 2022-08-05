import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import CourtInformationForm, {
  CourtDetails,
} from "../intake/CourtInformationForm";
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

  switch (step) {
    case 1:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <ReferralForm
            referralDetails={referralDetails}
            setReferralDetails={setReferralDetails}
            nextStep={nextStep}
          />
        </Box>
      );
    case 2:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <CourtInformationForm
            courtDetails={courtDetails}
            setCourtDetails={setCourtDetails}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </Box>
      );
    default:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <PermittedIndividualsForm
            permittedIndividualDetails={permittedIndividualDetails}
            setPermittedIndividualDetails={setPermittedIndividualDetails}
            prevStep={prevStep}
          />
        </Box>
      );
  }
};

export default Intake;
