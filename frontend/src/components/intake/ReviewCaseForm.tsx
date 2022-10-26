import React from "react";
import { Box } from "@chakra-ui/react";

type ReviewFormProps = {
  prevStep: () => void;
};

const ReviewForm = ({ prevStep }: ReviewFormProps): React.ReactElement => {
  const onSubmit = () => {};

  return <Box>Review case details</Box>;
};

export default ReviewForm;
