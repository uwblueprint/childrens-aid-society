import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { User, Phone, File, Users, Calendar } from "react-feather";
import CustomInput from "../common/CustomInput";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
// eslint-disable-next-line import/no-cycle
import IntakeFooter from "./IntakeFormFooter";

export type ReferralDetails = {
  cpinFileNumber: string;
  cpinFileType: string;
  familyName: string;
  phoneNumber: string;
  referralDate: string;
  referringWorker: string;
  referringWorkerContact: string;
};

type ReferralFormProps = {
  referralDetails: ReferralDetails;
  setReferralDetails: React.Dispatch<React.SetStateAction<ReferralDetails>>;
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
  hideStepper?: boolean;
  hideFooter?: boolean;
};

const ReferralForm = ({
  referralDetails,
  setReferralDetails,
  nextStep,
  setStep,
  readOnly = false,
  hideStepper,
  hideFooter,
}: ReferralFormProps): React.ReactElement => {
  const onSubmit = (values: ReferralDetails) => {
    setReferralDetails(values);
    nextStep();
  };

  const formik = useFormik({
    initialValues: referralDetails,
    onSubmit: (values: ReferralDetails) => {
      onSubmit(values);
    },
  });

  const onNextStep = () => {
    nextStep();
    setReferralDetails(formik.values);
  };

  const onClear = () => {
    formik.setValues({
      referringWorker: "",
      referringWorkerContact: "",
      familyName: "",
      referralDate: "",
      cpinFileNumber: "",
      cpinFileType: "",
      phoneNumber: "",
    });
  };

  const [referringWorkerContactError, setreferringWorkerContactError] = useState<string | null>(null);

  function validatePhone(value: string) {
    if (!value) {
      setreferringWorkerContactError("Required");
    } else if (!/^(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4}[,]?)(\s?([E|e]xt[.]?)(\s?\d+))?/.test(value)) {
      setreferringWorkerContactError("Invalid phone number");
    } else {
      setreferringWorkerContactError(null);
    }
  }

  return (
    <>
      {!hideStepper && (
        <Stepper
          pages={[
            "Case referral",
            "Court information",
            "Individual details",
            "Program details",
          ]}
          setStep={setStep}
          activePage={IntakeSteps.CASE_REFERRAL}
          onClickCallback={() => {
            setReferralDetails(formik.values);
          }}
        />
      )}
      <FormikProvider value={formik}>
        <Form>
          <FormControl>
            <SimpleGrid columns={2} spacingX="48px" spacingY="10px">
              <Box>
                <FormLabel htmlFor="referringWorker">
                  REFERRING WORKER
                </FormLabel>
                <Field
                  disabled={readOnly}
                  as={CustomInput}
                  id="referringWorker"
                  name="referringWorker"
                  type="string"
                  placeholder="Enter name of the referring worker..."
                  icon={<Icon as={User} />}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="referringWorkerContact">
                  REFERRING WORKER CONTACT
                </FormLabel>
                <Field
                  disabled={readOnly}
                  as={CustomInput}
                  name="referringWorkerContact"
                  id="referringWorkerContact"
                  type="string"
                  placeholder="(e.g. 555-555-5555, ext. 123)"
                  icon={<Icon as={Phone} />}
                  validate={validatePhone}
                />
                {referringWorkerContactError && (
                  <div style={{ color: "red" }}>{referringWorkerContactError}</div>
                )}
              </Box>
              <Box>
                <FormLabel htmlFor="cpinFileNumber">CPIN FILE NUMBER</FormLabel>
                <Field
                  disabled={readOnly}
                  as={CustomInput}
                  id="cpinFileNumber"
                  name="cpinFileNumber"
                  type="string"
                  placeholder="Enter file number of the referred case"
                  icon={<Icon as={File} />}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="cpinFileType">CPIN FILE TYPE</FormLabel>
                <Field
                  disabled={readOnly}
                  as={Select}
                  id="cpinFileType"
                  name="cpinFileType"
                  type="string"
                  placeholder="Select the CPIN file type..."
                />
              </Box>
            </SimpleGrid>
            <Box paddingTop="10px">
              <FormLabel htmlFor="familyName">FAMILY NAME</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="familyName"
                name="familyName"
                type="string"
                placeholder="Enter family name as referenced in the case"
                icon={<Icon as={Users} />}
              />
            </Box>
            <Box paddingTop="10px">
              <FormLabel htmlFor="referralDate">REFERRAL DATE</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="referralDate"
                name="referralDate"
                type="string"
                placeholder="DD/MM/YYYY"
                icon={<Icon as={Calendar} />}
              />
            </Box>
          </FormControl>
        </Form>
      </FormikProvider>
      {!hideFooter && (
        <IntakeFooter
          nextButtonText="Next section"
          showClearPageBtn
          isStepComplete={() => true} // TODO: validate form
          registrationLoading={false}
          nextStepCallBack={onNextStep}
          clearFields={onClear}
        />
      )}
    </>
  );
};

export default ReferralForm;
