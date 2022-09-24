import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import CustomInput from "../common/CustomInput";

export type PermittedIndividual = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: string;
};

export type PermittedIndividualDetails = {
  individuals: PermittedIndividual[];
};

export const makeEmptyPermittedIndividual = (): PermittedIndividual => ({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  relationship: "",
});

type PermittedIndividualFormProps = {
  permittedIndividualDetails: PermittedIndividualDetails;
  setPermittedIndividualDetails: React.Dispatch<
    React.SetStateAction<PermittedIndividualDetails>
  >;
  prevStep: () => void;
};

const PermittedIndividualsForm = ({
  permittedIndividualDetails,
  setPermittedIndividualDetails,
  prevStep,
}: PermittedIndividualFormProps): React.ReactElement => {
  const onSubmit = (values: PermittedIndividualDetails) =>
    setPermittedIndividualDetails(values);

  return (
    <Formik initialValues={permittedIndividualDetails} onSubmit={onSubmit}>
      {({ handleSubmit, values: { individuals } }) => (
        <Form style={{ padding: "0px 100px 70px 100px" }}>
          <Heading textStyle="heading">Other Permitted Individuals</Heading>
          <FormControl style={{ padding: "30px" }}>
            <FieldArray name="individuals">
              {(helpers) => (
                <>
                  {individuals.map((individual, index) => (
                    <React.Fragment key={index}>
                      <SimpleGrid columns={2} spacing="70px">
                        <Box>
                          <FormLabel
                            htmlFor={`firstName-${index}`}
                            style={{ marginTop: "0px" }}
                          >
                            FIRST NAME
                          </FormLabel>
                          <Field
                            as={CustomInput}
                            name={`individuals.${index}.firstName`}
                            id={`firstName-${index}`}
                            type="string"
                            placeholder="Enter name of worker..."
                          />
                        </Box>
                        <Box>
                          <FormLabel
                            htmlFor={`lastName-${index}`}
                            style={{ marginTop: "0px" }}
                          >
                            LAST NAME
                          </FormLabel>
                          <Field
                            as={CustomInput}
                            name={`individuals.${index}.lastName`}
                            id={`lastName-${index}`}
                            type="string"
                            placeholder="Enter name of worker..."
                          />
                        </Box>
                      </SimpleGrid>
                      <SimpleGrid columns={2} spacing="70px">
                        <Box>
                          <FormLabel htmlFor={`relationship-${index}`}>
                            RELATIONSHIP TO CHILD
                          </FormLabel>
                          <Field
                            as={Select}
                            name={`individuals.${index}.relationship`}
                            placeholder="Choose relationship..."
                            id={`relationship-${index}`}
                          >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                          </Field>
                        </Box>
                        <Box>
                          <FormLabel htmlFor={`phoneNumber-${index}`}>
                            PHONE NUMBER
                          </FormLabel>
                          <Field
                            as={CustomInput}
                            name={`individuals.${index}.phoneNumber`}
                            id={`phoneNumber-${index}`}
                            type="string"
                            placeholder="(ie. 223-2232-2323)"
                          />
                        </Box>
                      </SimpleGrid>
                      {individuals.length > 1 && (
                        <Button
                          marginTop="10px"
                          marginBottom="20px"
                          type="button"
                          onClick={() => helpers.remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                  <Box paddingTop="10px">
                    <Button
                      type="button"
                      onClick={() =>
                        helpers.push(makeEmptyPermittedIndividual())
                      }
                    >
                      Add
                    </Button>
                  </Box>
                </>
              )}
            </FieldArray>
          </FormControl>
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
