import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { User, Phone, File, Users, Calendar } from "react-feather";
import * as Yup from 'yup';
import CustomInput from "../common/CustomInput";

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
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const dateRegExp = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

const SignupSchema = Yup.object().shape({
  cpinFileNumber: Yup.number().required('This is a required field'),
  familyName: Yup.string().required('This is a required field'),
  referringWorkerContact: Yup.string()
    .matches(phoneRegExp, 'Please provide a phone number or extension in the valid format. eg. 555-555-5555')
    .required('This is a required field'),
  referralDate: Yup.string()
    .matches(dateRegExp, 'Please enter a date in the desired format. ie. DD/MM/YYYY')
    .required('This is a required field'),
  referringWorker: Yup.string().required('This is a required field'),
});

const ReferralForm = ({
  referralDetails,
  setReferralDetails,
  nextStep,
}: ReferralFormProps): React.ReactElement => {
  const onSubmit = (values: ReferralDetails) => {
    setReferralDetails(values);
    nextStep();
  };

  return (
    <Formik 
      initialValues={referralDetails} 
      validationSchema={SignupSchema} 
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
      <Form>
        <FormControl>
          <SimpleGrid columns={2} spacing="70px">
            <Box>
              <FormLabel htmlFor="referringWorker">REFERRING WORKER</FormLabel>
              <Field
                as={CustomInput}
                id="referringWorker"
                name="referringWorker"
                type="string"
                placeholder="Enter name of the referring worker..."
                icon={<Icon as={User} />}
              />
              {errors.referringWorker && touched.referringWorker ? (
              <div>{errors.referringWorker}</div>
              ) : null}
            </Box>
            <Box>
              <FormLabel htmlFor="referringWorkerContact">
                REFERRING WORKER CONTACT
              </FormLabel>
              <Field
                as={CustomInput}
                name="referringWorkerContact"
                id="referringWorkerContact"
                type="string"
                placeholder="(e.g. 555-555-5555, ext. 123)"
                icon={<Icon as={Phone} />}
              />
              {errors.referringWorkerContact && touched.referringWorkerContact ? (
              <div>{errors.referringWorkerContact}</div>
              ) : null}
            </Box>
            <Box>
              <FormLabel htmlFor="cpinFileNumber">CPIN FILE NUMBER</FormLabel>
              <Field
                as={CustomInput}
                id="cpinFileNumber"
                name="cpinFileNumber"
                type="string"
                placeholder="Enter file number of the referred case"
                icon={<Icon as={File} />}
              />
              {errors.referringWorkerContact && touched.referringWorkerContact ? (
              <div>{errors.referringWorkerContact}</div>
              ) : null}
            </Box>
            <Box>
              <FormLabel htmlFor="cpinFileType">CPIN FILE TYPE</FormLabel>
              <Field
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
              as={CustomInput}
              id="familyName"
              name="familyName"
              type="string"
              placeholder="Enter family name as referenced in the case"
              icon={<Icon as={Users} />}
            />
            {errors.familyName && touched.familyName ? (
              <div>{errors.familyName}</div>
              ) : null}
          </Box>
          <Box paddingTop="10px">
            <FormLabel htmlFor="referralDate">REFERRAL DATE</FormLabel>
            <Field
              as={CustomInput}
              id="referralDate"
              name="referralDate"
              type="string"
              placeholder="DD/MM/YYYY"
              icon={<Icon as={Calendar} />}
            />
            {errors.referralDate && touched.referralDate ? (
              <div>{errors.referralDate}</div>
              ) : null}
          </Box>
        </FormControl>
        <Button type="submit" marginTop="30px">
          Next Button
        </Button>
      </Form>
      )}
    </Formik>
  );
};

export default ReferralForm;
