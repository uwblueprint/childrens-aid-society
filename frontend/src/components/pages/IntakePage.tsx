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

  const permittedInitialValues: PermittedIndividualDetails = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    relationship: "",
  };
  const courtInitialValues: CourtDetails = {
    currentCourtStatus: "",
    firstNationHeritage: "",
    firstNationBand: "",
    orderReferral: null,
  };

  const referralInitialValues: ReferralDetails = {
    referringWorker: "",
    referringWorkerContact: "",
    familyName: "",
    referralDate: "",
    cpinFileNumber: "",
    cpinFileType: "",
    phoneNumber: "",
  };

  switch (step) {
    case 1:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <Formik
            initialValues={referralInitialValues}
            onSubmit={(values, actions) => {
              console.log("referral", values);
              setReferralDetails(values);
              actions.setSubmitting(false);
              nextStep();
            }}
          >
            <Form>
              <ReferralForm />
              <Button type="submit">Next Button</Button>
            </Form>
          </Formik>
        </Box>
      );
    case 2:
      return (
        <Box style={{ textAlign: "center", padding: "20px 0px 20px 0px" }}>
          <Formik
            initialValues={courtInitialValues}
            onSubmit={(values, actions) => {
              console.log("court", values);
              setCourtDetails(values);
              prevStep();
              actions.setSubmitting(false);
            }}
          >
            {({ handleSubmit, values }) => (
              <Form>
                <CourtInformationForm />
                <Button
                  type="submit"
                  onClick={() => {
                    console.log("COURT", values);
                    handleSubmit();
                    prevStep();
                  }}
                >Previous Button</Button>
                <Button
                  type="submit"
                  onClick={() => {
                    console.log("COURT", values);
                    handleSubmit();
                    nextStep();
                  }}
                >
                  Next Button
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      );
    default:
      return (
        <Box style={{ textAlign: "center", padding: "30px 0px 40px 0px" }}>
          <Formik
            initialValues={permittedInitialValues}
            onSubmit={(values, actions) => {
              console.log("permitted", values);
              setPermittedIndividualDetails(values);
              prevStep();
              actions.setSubmitting(false);
            }}
          >
            <Form>
              <PermittedIndividualsForm />
              <Button type="submit">Previous Button</Button>
            </Form>
          </Formik>
        </Box>
      );
  }
};

export default Intake;
