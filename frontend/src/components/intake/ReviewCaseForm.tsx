import React from "react";
import { Box, Button, VStack, Text, HStack, Icon } from "@chakra-ui/react";
import { Edit2 } from "react-feather";
import { IndividualDetailsOverview } from "./PromptBox";

type ReviewFormProps = {
  prevStep: () => void;
  title: string;
  childrenDetails?: IndividualDetailsOverview[];
  caregiverDetails?: IndividualDetailsOverview[];
};

const ReviewForm = ({
  prevStep,
  title,
  childrenDetails,
  caregiverDetails,
}: ReviewFormProps): React.ReactElement => {
  return (
    <>
      <VStack padding="32px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            {title}
          </Text>
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
          >
            Edit
          </Button>
        </HStack>
      </VStack>

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
