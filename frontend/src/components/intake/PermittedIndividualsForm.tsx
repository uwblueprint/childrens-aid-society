import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

export type PermittedIndividualDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: string;
};

type PermittedIndividualFormProps = {
  allOtherPermittedIndividuals: PermittedIndividualDetails[];
  setAllOtherPermittedIndividuals: React.Dispatch<
    React.SetStateAction<PermittedIndividualDetails[]>
  >;
  prevStep: () => void;
};

const PermittedIndividualsForm = ({
  allOtherPermittedIndividuals,
  setAllOtherPermittedIndividuals,
  prevStep,
}: PermittedIndividualFormProps): React.ReactElement => {
  const initialValues: PermittedIndividualDetails = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    relationship: "",
  };
  const onSubmit = (values: PermittedIndividualDetails) => {
    setAllOtherPermittedIndividuals([...allOtherPermittedIndividuals, values]);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange }) => (
        <Form style={{ padding: "0px 100px 70px 100px" }}>
          <Heading textStyle="heading">Other Permitted Individuals</Heading>
          <FormControl style={{ padding: "30px" }}>
            <SimpleGrid columns={2} spacing="70px">
              <Box>
                <FormLabel htmlFor="firstName" style={{ marginTop: "0px" }}>
                  FIRST NAME
                </FormLabel>
                <Input
                  name="firstName"
                  id="firstName"
                  type="string"
                  placeholder="Enter name of worker..."
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="lastName" style={{ marginTop: "0px" }}>
                  LAST NAME
                </FormLabel>
                <Input
                  name="lastName"
                  id="lastName"
                  type="string"
                  placeholder="Enter name of worker..."
                  onChange={handleChange}
                />
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing="70px">
              <Box>
                <FormLabel htmlFor="relationship">
                  RELATIONSHIP TO CHILD
                </FormLabel>
                <Select
                  name="relationship"
                  placeholder="Choose relationship..."
                  id="relationship"
                  onChange={handleChange}
                >
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="phoneNumber">PHONE NUMBER</FormLabel>
                <Input
                  name="phoneNumber"
                  id="phoneNumber"
                  type="string"
                  placeholder="(ie. 223-2232-2323)"
                  onChange={handleChange}
                />
              </Box>
            </SimpleGrid>
          </FormControl>
          <Button type="submit">Add</Button>
          <Button
            onClick={() => {
              handleSubmit();
              prevStep();
            }}
          >
            Previous Button
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PermittedIndividualsForm;
