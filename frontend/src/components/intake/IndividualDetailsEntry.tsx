import React from "react";
import { Button, VStack, Icon } from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import { useRouteMatch } from "react-router-dom";
import PromptBox from "./PromptBox";

export type IndividualDetailsEntryProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const IndividualDetailsEntry = ({
  nextStep,
  prevStep,
}: IndividualDetailsEntryProp): React.ReactElement => {
  const { url } = useRouteMatch();

  return (
    <React.Fragment key="IndividualDetailsEntry">
      <VStack padding="32px" spacing="24px">
        <PromptBox
          headerText="Children"
          descriptionText="No children have been added to the case yet. "
          buttonText="Add child"
          buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          onButtonClick={() => {
            window.location.assign(`${url}/individual-details`);
          }}
        />
        <PromptBox
          headerText="Caregivers"
          descriptionText="No caregivers have been added to the case yet. "
          buttonText="Add caregiver"
          buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          onButtonClick={() => {
            window.location.assign(`${url}/individual-details`);
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
