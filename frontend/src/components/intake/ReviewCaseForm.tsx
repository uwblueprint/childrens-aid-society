import React from "react";
import { Button, FormControl, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";

type ReviewFormProps = {
  prevStep: () => void;
};

const ReviewForm = ({ prevStep }: ReviewFormProps): React.ReactElement => {
  const onSubmit = () => {};

  return (
    <Formik initialValues={{ reviewDetails: "test" }} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Form style={{ padding: "0px 100px 30px 100px" }}>
          <Heading textStyle="header-large">Review Case Details</Heading>
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

export default ReviewForm;
