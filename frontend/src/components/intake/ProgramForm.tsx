import React from "react";
import {
  Button,
  FormControl,
  Heading,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import { Form, Formik } from "formik";

export type ProgramDetails = {
  test: string;
};

type ProgramFormProps = {
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  nextStep: () => void;
  prevStep: () => void;
};

const ProgramForm = ({
  programDetails,
  setProgramDetails,
  nextStep,
  prevStep,
}: ProgramFormProps): React.ReactElement => {
  const onSubmit = (values: ProgramDetails) => {
    setProgramDetails(values);
  };

  return (
    <Formik initialValues={programDetails} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Form style={{ padding: "2rem 12rem" }}>
          <Heading textStyle="heading">Program Details</Heading>
          <FormControl style={{ padding: "30px" }}>
            <Flex style={{ padding: "30px" }}>
              <Text align="left" flex="1" textStyle="title-medium">
                Other permitted individuals
              </Text>
              <Button leftIcon={<Icon as={UserPlus} />} variant="secondary">
                Add
              </Button>
            </Flex>
          </FormControl>
          <Button
            onClick={() => {
              handleSubmit();
              prevStep();
            }}
          >
            Previous Button
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              nextStep();
            }}
          >
            Next Button
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProgramForm;
