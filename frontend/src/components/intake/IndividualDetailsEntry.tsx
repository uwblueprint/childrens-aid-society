import React from "react";
import { Button, VStack, Icon, useDisclosure } from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import { useHistory } from "react-router-dom";
import PromptBox, { IndividualDetailsOverview } from "./PromptBox";
import { ADD_CHILD_PAGE } from "../../constants/Routes";
import NewCaregiverModal from "./NewCaregiverModal";

export type IndividualDetailsEntryProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const IndividualDetailsEntry = ({
  nextStep,
  prevStep,
}: IndividualDetailsEntryProp): React.ReactElement => {
  const history = useHistory();

  const {
    onOpen: onOpenAddCaregivers,
    isOpen: isOpenAddCaregivers,
    onClose: onCloseAddCaregivers,
  } = useDisclosure();

  const testCaregivers: IndividualDetailsOverview[] = [
    { firstName: "first", lastName: "last", fileNumber: "1231321312321" },
    { firstName: "John", lastName: "Doe", fileNumber: "0123456789" },
  ];

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
          onButtonClick={onOpenAddCaregivers}
          individualDetails={testCaregivers}
        />
        <NewCaregiverModal
          isOpen={isOpenAddCaregivers}
          onClose={onCloseAddCaregivers}
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
