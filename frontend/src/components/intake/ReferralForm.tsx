import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

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
    <Formik initialValues={referralDetails} onSubmit={onSubmit}>
      <Form style={{ padding: "0px 100px 30px 100px" }}>
        <Heading textStyle="header-large">Referral Details</Heading>
        <FormControl style={{ padding: "30px" }}>
          <SimpleGrid columns={2} spacing="70px">
            <Box>
              <FormLabel htmlFor="referringWorker" style={{ marginTop: "0px" }}>
                REFERRING WORKER
              </FormLabel>
              <Field
                as={Input}
                id="referringWorker"
                name="referringWorker"
                type="string"
                placeholder="Enter name of worker..."
              />
            </Box>
            <Box>
              <FormLabel
                htmlFor="referringWorkerContact"
                style={{ marginTop: "0px" }}
              >
                REFERRING WORKER CONTACT
              </FormLabel>
              <Field
                as={Input}
                name="referringWorkerContact"
                id="referringWorkerContact"
                type="string"
                placeholder="(ie. 223-2232-2323)"
              />
            </Box>
          </SimpleGrid>
          <FormLabel htmlFor="familyName">FAMILY NAME</FormLabel>
          <Field
            as={Input}
            id="familyName"
            name="familyName"
            type="string"
            placeholder="Enter family name..."
          />
          <FormLabel htmlFor="referralDate">REFERRAL DATE</FormLabel>
          {/* TO DO : change to date picker */}
          <Field
            as={Input}
            id="referralDate"
            name="referralDate"
            type="string"
            placeholder="Select a date..."
          />
          <SimpleGrid columns={2} spacing="70px">
            <Box>
              <FormLabel htmlFor="cpinFileNumber">CPIN FILE NUMBER</FormLabel>
              <Field
                as={Input}
                id="cpinFileNumber"
                name="cpinFileNumber"
                type="string"
                placeholder="(ie. 123456789)"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="cpinFileType">CPIN FILE TYPE</FormLabel>
              <Field
                as={Input}
                id="cpinFileType"
                name="cpinFileType"
                type="string"
                placeholder="Select a file type..."
              />
            </Box>
          </SimpleGrid>
          <FormLabel htmlFor="phoneNumber">PHONE NUMBER</FormLabel>
          <Field
            as={Input}
            id="phoneNumber"
            name="phoneNumber"
            type="string"
            placeholder="(ie. 223-2232-2323)"
          />
        </FormControl>
        <Button type="submit">Next Button</Button>
      </Form>
    </Formik>
  );
};

export default ReferralForm;
