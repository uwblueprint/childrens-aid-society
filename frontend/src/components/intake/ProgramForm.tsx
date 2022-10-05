import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

export type ProgramDetails = {
  test: string;
};

type ProgramFormProps = {
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  prevStep: () => void;
};

const ProgramForm = ({
  programDetails,
  setProgramDetails,
  prevStep,
}: ProgramFormProps): React.ReactElement => {
  const onSubmit = (values: ProgramDetails) => {
    setProgramDetails(values);
    prevStep();
  };

  return (
    <Formik initialValues={programDetails} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Form style={{ padding: "0px 100px 30px 100px" }}>
          <Heading textStyle="header-large">Program Details</Heading>
          <FormControl style={{ padding: "30px" }}>Basic Form</FormControl>
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

export default ProgramForm;
