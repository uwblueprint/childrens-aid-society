import React from "react";
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { User, Phone, File, Users, Calendar } from "react-feather";
import CustomInput from "../common/CustomInput";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const dateRegExp = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const validationSchema = Yup.object().shape({
  cpinFileNumber: Yup.number()
    .required("This is a required field")
    .typeError("CPIN file number must be a number"),
  familyName: Yup.string().required("This is a required field"),
  referringWorkerContact: Yup.string()
    .matches(
      phoneRegExp,
      "Please provide a phone number or extension in the valid format. eg. 555-555-5555",
    )
    .required("This is a required field"),
  referralDate: Yup.string()
    .matches(
      dateRegExp,
      "Please enter a date in the desired format. ie. DD/MM/YYYY",
    )
    .required("This is a required field"),
  referringWorker: Yup.string().required("This is a required field"),
});

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
    validationSchema,
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
                  backgroundColor={
                    formik.errors.referringWorker &&
                    formik.touched.referringWorker
                      ? "red.50"
                      : ""
                  }
                  borderColor={
                    formik.errors.referringWorker &&
                    formik.touched.referringWorker
                      ? "red.400"
                      : ""
                  }
                />
                {formik.errors.referringWorker &&
                formik.touched.referringWorker ? (
                  <Text color="red">{formik.errors.referringWorker}</Text>
                ) : null}
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
                  backgroundColor={
                    formik.errors.referringWorkerContact &&
                    formik.touched.referringWorkerContact
                      ? "red.50"
                      : ""
                  }
                  borderColor={
                    formik.errors.referringWorkerContact &&
                    formik.touched.referringWorkerContact
                      ? "red.400"
                      : ""
                  }
                />
                {formik.errors.referringWorkerContact &&
                formik.touched.referringWorkerContact ? (
                  <Text color="red">
                    {formik.errors.referringWorkerContact}
                  </Text>
                ) : null}
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
                  backgroundColor={
                    formik.errors.cpinFileNumber &&
                    formik.touched.cpinFileNumber
                      ? "red.50"
                      : ""
                  }
                  borderColor={
                    formik.errors.cpinFileNumber &&
                    formik.touched.cpinFileNumber
                      ? "red.400"
                      : ""
                  }
                />
                {formik.errors.cpinFileNumber &&
                formik.touched.cpinFileNumber ? (
                  <Text color="red">{formik.errors.cpinFileNumber}</Text>
                ) : null}
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
                  backgroundColor={
                    formik.errors.cpinFileType && formik.touched.cpinFileType
                      ? "red.50"
                      : ""
                  }
                  borderColor={
                    formik.errors.cpinFileType && formik.touched.cpinFileType
                      ? "red.400"
                      : ""
                  }
                />
                {formik.errors.cpinFileType && formik.touched.cpinFileType ? (
                  <Text color="red">{formik.errors.cpinFileType}</Text>
                ) : null}
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
                backgroundColor={
                  formik.errors.familyName && formik.touched.familyName
                    ? "red.50"
                    : ""
                }
                borderColor={
                  formik.errors.familyName && formik.touched.familyName
                    ? "red.400"
                    : ""
                }
              />
              {formik.errors.familyName && formik.touched.familyName ? (
                <Text color="red">{formik.errors.familyName}</Text>
              ) : null}
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
                backgroundColor={
                  formik.errors.referralDate && formik.touched.referralDate
                    ? "red.50"
                    : ""
                }
                borderColor={
                  formik.errors.referralDate && formik.touched.referralDate
                    ? "red.400"
                    : ""
                }
              />
              {formik.errors.referralDate && formik.touched.referralDate ? (
                <Text color="red">{formik.errors.referralDate}</Text>
              ) : null}
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
