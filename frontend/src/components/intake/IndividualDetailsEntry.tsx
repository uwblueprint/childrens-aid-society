import React from "react";
import { VStack, Icon } from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import { useHistory } from "react-router-dom";
import PromptBox from "./PromptBox";
import { ADD_CHILD_PAGE } from "../../constants/Routes";
import { CaregiverDetails, Caregivers } from "./NewCaregiverModal";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";
import CaregiverForm from "./indivDetails/CaregiverProviderForm";

export type IndividualDetailsEntryProp = {
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  hideStepper?: boolean;
  hideFooter?: boolean;
  caregivers: Caregivers;
  setCaregivers: React.Dispatch<React.SetStateAction<Caregivers>>;
  caregiverDetails: CaregiverDetails;
  setCaregiverDetails: React.Dispatch<React.SetStateAction<CaregiverDetails>>;
};

const IndividualDetailsEntry = ({
  nextStep,
  setStep,
  hideStepper,
  hideFooter,
  caregivers,
  setCaregivers,
  caregiverDetails,
  setCaregiverDetails,
}: IndividualDetailsEntryProp): React.ReactElement => {
  const history = useHistory();

  const onNextStep = () => {
    nextStep();
    // TODO: SET UP SAVING INVIDUAL DETAILS
  };

  return (
    <>
      {!hideStepper && (
        <Stepper
          pages={[
            "Case referral",
            "Court information",
            "Individual details",
            "Program details",
          ]}
          setStep={setStep}
          activePage={IntakeSteps.INDIVIDUAL_DETAILS}
          onClickCallback={() => {}} // TODO: SET UP SAVING INDIVIDUAL DETAILS
        />
      )}
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
          <CaregiverForm
            caregivers={caregivers}
            setCaregivers={setCaregivers}
            caregiverDetails={caregiverDetails}
            setCaregiverDetails={setCaregiverDetails}
          />
        </VStack>
      </React.Fragment>
      {!hideFooter && (
        <IntakeFooter
          currentStep={IntakeSteps.INDIVIDUAL_DETAILS}
          nextButtonText="Next section"
          showClearPageBtn
          isStepComplete={() => true} // TODO: validate form
          registrationLoading={false}
          nextStepCallBack={onNextStep}
        />
      )}
    </>
  );
};

export default IndividualDetailsEntry;
