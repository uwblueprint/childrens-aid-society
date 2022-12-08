import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import CustomInput from "../common/CustomInput";
import { CustomSelectField } from "./Select";

export type PermittedIndividualDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: string;
};

type PermittedIndividualFormProps = {
  permittedIndividualDetails: PermittedIndividualDetails;
  setPermittedIndividualDetails: React.Dispatch<
    React.SetStateAction<PermittedIndividualDetails>
  >;
  prevStep: () => void;
  nextStep: () => void;
};

const PermittedIndividualsForm = ({
  permittedIndividualDetails,
  setPermittedIndividualDetails,
  nextStep,
  prevStep,
}: PermittedIndividualFormProps): React.ReactElement => {
  const onSubmit = (values: PermittedIndividualDetails) =>
    setPermittedIndividualDetails(values);

  return (
    <Formik initialValues={permittedIndividualDetails} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Form>
          <FormControl>
            <SimpleGrid columns={2} spacing="70px">
              <Box>
                <FormLabel htmlFor="firstName" style={{ marginTop: "0px" }}>
                  FIRST NAME
                </FormLabel>
                <Field
                  as={CustomInput}
                  name="firstName"
                  id="firstName"
                  type="string"
                  placeholder="Enter name of worker..."
                />
              </Box>
              <Box>
                <FormLabel htmlFor="lastName" style={{ marginTop: "0px" }}>
                  LAST NAME
                </FormLabel>
                <Field
                  as={CustomInput}
                  name="lastName"
                  id="lastName"
                  type="string"
                  placeholder="Enter name of worker..."
                />
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing="70px">
              <Box>
                <FormLabel htmlFor="relationship">
                  RELATIONSHIP TO CHILD
                </FormLabel>
                <Field
                  as={CustomSelectField}
                  name="relationship"
                  placeholder="Choose relationship..."
                  id="relationship"
                >
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </Field>
              </Box>
              <Box>
                <FormLabel htmlFor="phoneNumber">PHONE NUMBER</FormLabel>
                <Field
                  as={CustomInput}
                  name="phoneNumber"
                  id="phoneNumber"
                  type="string"
                  placeholder="(ie. 223-2232-2323)"
                />
              </Box>
            </SimpleGrid>
          </FormControl>
          <Box marginTop="16px">
            <Button type="submit" marginRight="10px">
              Add
            </Button>
            <Button
              marginLeft="10px"
              onClick={() => {
                handleSubmit();
                prevStep();
              }}
            >
              Previous Button
            </Button>
            <Button
              marginLeft="10px"
              onClick={() => {
                handleSubmit();
                nextStep();
              }}
            >
              Next Button
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PermittedIndividualsForm;
