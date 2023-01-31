import React from "react";
import { Box, Button } from "@chakra-ui/react";
import IndividualDetails from "./IndividualDetails";

type ReviewFormProps = {
  prevStep: () => void;
};

const ReviewForm = ({ prevStep }: ReviewFormProps): React.ReactElement => {
  return (
    <>
      <IndividualDetails
        title="Individual details"
        childrenDetails={[]}
        caregiverDetails={[]}
      />
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
