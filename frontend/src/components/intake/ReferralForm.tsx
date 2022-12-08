import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { User, Phone, File, Users, Calendar } from "react-feather";
import CustomInput from "../common/CustomInput";
import { CustomSelectField } from "./Select";

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
      <Form>
        <FormControl>
          <SimpleGrid columns={2} spacing="32px">
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
            </Box>
            <Box>
              <FormLabel htmlFor="cpinFileType">CPIN FILE TYPE</FormLabel>
              <CustomSelectField
                id="cpinFileType"
                name="cpinFileType"
                defaultValue=""
              >
                <option value="">Select the CPIN file type...</option>
                <option>Investigation</option>
                <option>Ongoing</option>
              </CustomSelectField>
            </Box>
          </SimpleGrid>
          <Box paddingTop="32px">
            <FormLabel htmlFor="familyName">FAMILY NAME</FormLabel>
            <Field
              as={CustomInput}
              id="familyName"
              name="familyName"
              type="string"
              placeholder="Enter family name as referenced in the case"
              icon={<Icon as={Users} />}
            />
          </Box>
          <Box paddingTop="32px">
            <FormLabel htmlFor="referralDate">REFERRAL DATE</FormLabel>
            <Field
              as={CustomInput}
              id="referralDate"
              name="referralDate"
              type="string"
              placeholder="DD/MM/YYYY"
              icon={<Icon as={Calendar} />}
            />
          </Box>
        </FormControl>
        <Button type="submit" marginTop="32px">
          Next Button
        </Button>
      </Form>
    </Formik>
  );
};

export default ReferralForm;
