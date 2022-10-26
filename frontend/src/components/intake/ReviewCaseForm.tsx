import React from "react";
import { Box, Button } from "@chakra-ui/react";

type ReviewFormProps = {
  prevStep: () => void;
};

const ReviewForm = ({ prevStep }: ReviewFormProps): React.ReactElement => {
  return (
    <>
      <Box>
        <Button
          onClick={() => {
            prevStep();
          }}
        >
          Previous Button
        </Button>
      </Box>
    </>
  );
};

export default ReviewForm;
