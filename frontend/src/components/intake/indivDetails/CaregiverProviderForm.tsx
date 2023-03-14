import { useDisclosure, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { UserPlus } from "react-feather";
import NewCaregiverModal, {
  Caregivers,
  CaregiverDetails,
} from "../NewCaregiverModal";
import PromptBox, { IndividualDetailsOverview } from "../PromptBox";

export type CaregiverFormProps = {
  caregivers: Caregivers;
  setCaregivers: React.Dispatch<React.SetStateAction<Caregivers>>;
};

const CaregiverForm = ({
  caregivers,
  setCaregivers,
}: CaregiverFormProps): React.ReactElement => {
  const [caregiversDeleted, setCaregiversDeleted] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const {
    onOpen: onOpenAddCaregivers,
    isOpen: isOpenAddCaregivers,
    onClose: onCloseAddCaregivers,
  } = useDisclosure();

  const onClickNewCaregiver = (newCaregiver: CaregiverDetails) => {
    if (selectedIndex >= 0) {
      caregivers.splice(selectedIndex, 1, newCaregiver);
    } else {
      caregivers.push(newCaregiver);
    }
    setCaregivers(caregivers);
  };

  const deleteCaregiver = (index: number) => {
    caregivers.splice(index, 1);
    // this isn't really useful, but it helps refresh the component
    // ideally should have something useEffect, but current way of passing data does not work well with it
    setCaregiversDeleted(caregiversDeleted + 1);
    setCaregivers(caregivers);
  };

  const caregiverDetailsOverview: IndividualDetailsOverview[] = caregivers.map(
    (caregiver) => {
      const individualDetail: IndividualDetailsOverview = {
        name: caregiver.caregiverName,
        fileNumber: caregiver.primaryPhoneNo,
      };
      return individualDetail;
    },
  );

  const emptyCaregiver: CaregiverDetails = {
    caregiverName: "",
    dateOfBirth: "",
    primaryPhoneNo: "",
    secondaryPhoneNo: "",
    contactNotes: "",
    address: "",
    relationship: "",
    indivConsiderations: "",
  };

  return (
    <>
      <PromptBox
        headerText="Visiting Family Members"
        descriptionText="No visiting family members have been added to the case yet. "
        buttonText="Add Visiting Family"
        buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
        onButtonClick={onOpenAddCaregivers}
        individualDetails={caregiverDetailsOverview}
        deleteIndividual={deleteCaregiver}
        setSelectedIndex={setSelectedIndex}
      />
      <NewCaregiverModal
        isOpen={isOpenAddCaregivers}
        onClick={onClickNewCaregiver}
        onClose={onCloseAddCaregivers}
        caregiver={
          selectedIndex >= 0 ? caregivers[selectedIndex] : emptyCaregiver
        }
      />
    </>
  );
};

export default CaregiverForm;
