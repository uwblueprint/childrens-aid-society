import React from "react";
import { UserPlus } from "react-feather";
import { Icon } from "@chakra-ui/react";
import { Children } from "../child-information/AddChildPage";
import PromptBox from "../PromptBox";
import IntakeSteps from "../intakeSteps";

export type ChildrenFormProps = {
  childrens: Children;
  setChildren: React.Dispatch<React.SetStateAction<Children>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const ChildrenForm = ({
  childrens,
  setChildren,
  setStep,
}: ChildrenFormProps): React.ReactElement => {
  return (
    <>
      <PromptBox
        headerText="Children"
        descriptionText="No children have been added to the case yet. "
        buttonText="Add child"
        buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
        onButtonClick={() => {
          setStep(IntakeSteps.ADD_CHILD);
        }}
      />
    </>
  );
};

export default ChildrenForm;
