import React from "react";
import { Box, Button, HStack, Text, Icon, Stack } from "@chakra-ui/react";
import { Edit2 } from "react-feather";
import IndividualDetails from "./IndividualDetails";
import ReferralForm, { ReferralDetails } from "./ReferralForm";
import ProgramForm, { ProgramDetails } from "./ProgramForm";

type ReviewFormProps = {
  referralDetails: ReferralDetails;
  setReferralDetails: React.Dispatch<React.SetStateAction<ReferralDetails>>;
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  nextStep: () => void;
  prevStep: () => void;
};

const ReviewForm = ({
  referralDetails,
  setReferralDetails,
  programDetails,
  setProgramDetails,
  nextStep,
  prevStep,
}: ReviewFormProps): React.ReactElement => {
  return (
    <>
      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Case referral
          </Text>
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
          >
            Edit {/* TODO: implement edit button */}
          </Button>
        </HStack>
        <ReferralForm
          referralDetails={referralDetails}
          setReferralDetails={setReferralDetails}
          nextStep={nextStep}
          readOnly
        />
      </Stack>

      <IndividualDetails
        title="Individual details"
        childrenDetails={[]}
        caregiverDetails={[]}
      />

      <Stack padding="32px" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            Program Details
          </Text>
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
          >
            Edit {/* TODO: implement edit button */}
          </Button>
        </HStack>
        <ProgramForm
          programDetails={programDetails}
          setProgramDetails={setProgramDetails}
          nextStep={nextStep}
          prevStep={prevStep}
          readOnly
        />
      </Stack>

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
