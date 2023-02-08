import React from "react";
import { VStack, Icon, useDisclosure } from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import { useHistory } from "react-router-dom";
import PromptBox from "./PromptBox";
import { ADD_CHILD_PAGE } from "../../constants/Routes";
import NewCaregiverModal from "./NewCaregiverModal";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";

export type IndividualDetailsEntryProp = {
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const IndividualDetailsEntry = ({
  nextStep,
  setStep,
}: IndividualDetailsEntryProp): React.ReactElement => {
  const history = useHistory();

  const {
    onOpen: onOpenAddCaregivers,
    isOpen: isOpenAddCaregivers,
    onClose: onCloseAddCaregivers,
  } = useDisclosure();

  const onNextStep = () => {
    nextStep();
    // TODO: SET UP SAVING INVIDUAL DETAILS
  };

  return (
    <>
      <Stepper
        pages={[
          "Case referral",
          "Court information",
          "Individual details",
          "Program details",
        ]}
        setStep={setStep}
        activePage={IntakeSteps.INDIVIDUAL_DETAILS}
        onClickCallback={() => {}} // TODO: SET UP SAVING INVIDUAL DETAILS
      />
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
      <IntakeFooter
        currentStep={IntakeSteps.INDIVIDUAL_DETAILS}
        nextBtnTxt="Next"
        showClearPageBtn={!!true}
        isStepComplete={() => true}
        registrationLoading={false}
        nextStepCallBack={onNextStep}
      />
    </>
  );
};

export default IndividualDetailsEntry;
