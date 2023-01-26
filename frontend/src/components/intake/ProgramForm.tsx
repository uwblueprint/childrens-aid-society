import React, { useEffect } from "react";
import { FormControl, Heading } from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";

export type ProgramDetails = {
  test: string;
};

type ProgramFormProps = {
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
};

const ProgramForm = ({
  programDetails,
  setProgramDetails,
}: ProgramFormProps): React.ReactElement => {
  const onSubmit = (values: ProgramDetails) => {
    setProgramDetails(values);
  };

  const formik = useFormik({
    initialValues: programDetails,
    onSubmit: (values: ProgramDetails) => {
      onSubmit(values);
    },
  });
  useEffect(() => {
    setProgramDetails(formik.values);
    // eslint-disable-next-line
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form style={{ padding: "0px 100px 30px 100px" }}>
        <Heading textStyle="header-large">Program Details</Heading>
        <FormControl style={{ padding: "30px" }}>Basic Form</FormControl>
      </Form>
    </FormikProvider>
  );
};

export default ProgramForm;
