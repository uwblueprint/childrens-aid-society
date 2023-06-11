import React from "react";
import { VStack } from "@chakra-ui/react";
import { Caregivers } from "./NewCaregiverModal";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";
import ChildrenForm from "./indivDetails/ChildrenForm";
import CaregiverForm from "./indivDetails/CaregiverProviderForm";
import { Children } from "./child-information/AddChildPage";

export type IndividualDetailsEntryProp = {
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  hideStepper?: boolean;
  hideFooter?: boolean;
  childrens: Children;
  setChildren: React.Dispatch<React.SetStateAction<Children>>;
  caregivers: Caregivers;
  setCaregivers: React.Dispatch<React.SetStateAction<Caregivers>>;
};

const IndividualDetailsEntry = ({
  nextStep,
  setStep,
  hideStepper,
  hideFooter,
  childrens,
  setChildren,
  caregivers,
  setCaregivers,
}: IndividualDetailsEntryProp): React.ReactElement => {
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
          <ChildrenForm
            childrens={childrens}
            setChildren={setChildren}
            setStep={setStep}
          />
          <CaregiverForm
            caregivers={caregivers}
            setCaregivers={setCaregivers}
          />
        </VStack>
      </React.Fragment>
      {!hideFooter && (
        <IntakeFooter
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
