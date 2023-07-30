import React, { useState } from "react";
import { UserPlus } from "react-feather";
import { Icon } from "@chakra-ui/react";
import { Children } from "../child-information/AddChildPage";
import PromptBox, { IndividualDetailsOverview } from "../PromptBox";
import IntakeSteps from "../intakeSteps";

type ChildrenFormProps = {
  childrens: Children;
  setChildren: React.Dispatch<React.SetStateAction<Children>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIndexChild: React.Dispatch<React.SetStateAction<number>>;
};

const ChildrenForm = ({
  childrens,
  setChildren,
  setStep,
  setSelectedIndexChild,
}: ChildrenFormProps): React.ReactElement => {
  const [childrenDeleted, setChildrenDeleted] = useState(0);

  const deleteChild = (index: number) => {
    childrens.splice(index, 1);
    // this isn't really useful, but it helps refresh the component
    // ideally should have something useEffect, but current way of passing data does not work well with it
    setChildrenDeleted(childrenDeleted + 1);
    setChildren(childrens);
  };

  const childDetailsOverview: IndividualDetailsOverview[] = childrens.map(
    (child) => {
      const individualDetail: IndividualDetailsOverview = {
        name: child.childDetails.childName,
        fileNumber: child.childDetails.cpinFileNumber,
      };
      return individualDetail;
    },
  );

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
        individualDetails={childDetailsOverview}
        deleteIndividual={deleteChild}
        setSelectedIndex={setSelectedIndexChild}
      />
    </>
  );
};

export default ChildrenForm;
