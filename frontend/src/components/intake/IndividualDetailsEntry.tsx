import React from "react";
import { VStack, Icon } from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import { useHistory } from "react-router-dom";
import PromptBox from "./PromptBox";
import { ADD_CHILD_PAGE } from "../../constants/Routes";
import NewCaregiverModal from "./NewCaregiverModal";

const IndividualDetailsEntry = (): React.ReactElement => {
  const history = useHistory();

  const {
    onOpen: onOpenAddCaregivers,
    isOpen: isOpenAddCaregivers,
    onClose: onCloseAddCaregivers,
  } = useDisclosure();

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
        />
        <NewCaregiverModal
          isOpen={isOpenAddCaregivers}
          onClose={onCloseAddCaregivers}
        />
      </VStack>
    </React.Fragment>
  );
};

export default IndividualDetailsEntry;
