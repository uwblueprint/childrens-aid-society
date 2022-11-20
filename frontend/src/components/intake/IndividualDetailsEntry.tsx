import React from "react";
import { Button, VStack, Icon } from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import { useHistory } from "react-router-dom";
import PromptBox from "./PromptBox";
import {
  ADD_CHILD_PAGE,
  INDIVIDUAL_DETAILS_PAGE,
} from "../../constants/Routes";

export type IndividualDetailsEntryProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const IndividualDetailsEntry = ({
  nextStep,
  prevStep,
}: IndividualDetailsEntryProp): React.ReactElement => {
  const history = useHistory();

  return (
    <React.Fragment key="IndividualDetailsEntry">
      <VStack padding="32px" spacing="24px">
        <PromptBox
          headerText="Children"
          descriptionText="No children have been added to the case yet. "
          buttonText="Add child"
          buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          onButtonClick={() => {
            history.push(ADD_CHILD_PAGE);
          }}
        />
        <PromptBox
          headerText="Caregivers"
          descriptionText="No caregivers have been added to the case yet. "
          buttonText="Add caregiver"
          buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          onButtonClick={() => {
            history.push(INDIVIDUAL_DETAILS_PAGE);
          }}
        />
      </VStack>
      <Button
        onClick={() => {
          prevStep();
        }}
      >
        Previous Button
      </Button>
      <Button
        onClick={() => {
          nextStep();
        }}
      >
        Next Button
      </Button>
    </React.Fragment>
  );
};

export default IndividualDetailsEntry;
