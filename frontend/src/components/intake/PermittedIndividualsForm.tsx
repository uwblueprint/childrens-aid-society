import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field } from "formik";

export type PermittedIndividualDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: string;
};

const PermittedIndividualsForm = (): React.ReactElement => {
  return (
    <Box style={{ padding: "0px 100px 70px 100px" }}>
      <Heading textStyle="heading">Other Permitted Individuals</Heading>
      <FormControl style={{ padding: "30px" }}>
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel htmlFor="firstName" style={{ marginTop: "0px" }}>
              FIRST NAME
            </FormLabel>
            <Field
              as={Input}
              id="firstName"
              name="firstName"
              type="string"
              placeholder="Enter name of worker..."
            />
          </Box>
          <Box>
            <FormLabel htmlFor="lastName" style={{ marginTop: "0px" }}>
              LAST NAME
            </FormLabel>
            <Field
              as={Input}
              id="lastName"
              type="string"
              name="lastName"
              placeholder="Enter name of worker..."
            />
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel htmlFor="relationship">RELATIONSHIP TO CHILD</FormLabel>
            <Field
              as={Select}
              placeholder="Choose relationship..."
              id="relationship"
              name="relationship"
            >
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </Field>
          </Box>
          <Box>
            <FormLabel htmlFor="phoneNumber">PHONE NUMBER</FormLabel>
            <Field
              as={Input}
              id="phoneNumber"
              name="phoneNumber"
              type="string"
              placeholder="(ie. 223-2232-2323)"
            />
          </Box>
        </SimpleGrid>
      </FormControl>
    </Box>
  );
};

export default PermittedIndividualsForm;
