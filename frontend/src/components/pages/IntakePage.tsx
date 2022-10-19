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
import ProgramForm, { ProgramDetails } from "../intake/ProgramForm";
import ReviewForm, { ReviewDetails } from "../intake/ReviewCaseForm";
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
  const [programDetails, setProgramDetails] = useState<ProgramDetails>({
    test: "",
  });
  const [reviewDetails, setReviewDetails] = useState<ReviewDetails>({
    test: "",
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
      case 3:
        return (
          <>
            <IntakeHeader
              primaryTitle="Initiate New Case"
              secondaryTitle="Case Management"
            />
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <PermittedIndividualsForm
                permittedIndividualDetails={permittedIndividualDetails}
                setPermittedIndividualDetails={setPermittedIndividualDetails}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </Box>
          </>
        );
      case 4:
        return (
          <>
            <IntakeHeader
              primaryTitle="Initiate New Case"
              secondaryTitle="Case Management"
            />
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <ProgramForm
                programDetails={programDetails}
                setProgramDetails={setProgramDetails}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </Box>
          </>
        );
      default:
        return (
          <>
            <IntakeHeader
              primaryTitle="Initiate New Case"
              secondaryTitle="Case Management"
            />
            <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
              <ReviewForm
                reviewDetails={reviewDetails}
                setReviewDetails={setReviewDetails}
                prevStep={prevStep}
              />
            </Box>
          </>
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
