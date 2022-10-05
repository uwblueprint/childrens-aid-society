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

export type ReviewDetails = {
  test: string;
};

type ReviewFormProps = {
  reviewDetails: ReviewDetails;
  setReviewDetails: React.Dispatch<React.SetStateAction<ReviewDetails>>;
  prevStep: () => void;
};

const ReviewForm = ({
  reviewDetails,
  setReviewDetails,
  prevStep,
}: ReviewFormProps): React.ReactElement => {
  const onSubmit = (values: ReviewDetails) => {
    setReviewDetails(values);
  };

  return (
    <Formik initialValues={reviewDetails} onSubmit={onSubmit}>
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
