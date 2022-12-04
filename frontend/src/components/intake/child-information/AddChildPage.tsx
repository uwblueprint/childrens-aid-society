import { Button, Icon, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChevronLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import IntakeHeader from "../IntakeHeader";
import ChildInformationForm, { ChildDetails } from "./ChildInformationForm";
import ChildProviderForm from "./ChildProviderForm";
import FormSelector from "./FormSelector";
import SchoolDaycareForm, { SchoolDaycareDetails } from "./SchoolDaycareForm";

const AddChild = (): React.ReactElement => {
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const history = useHistory();
  const [childDetails, setChildDetails] = useState<ChildDetails>({
    childName: "",
    cpinFileNumber: "",
    dateOfBirth: "",
    workerName: "",
    specialNeeds: "",
    childBehaviours: "",
  });
  const [schoolDaycareDetails, setSchoolDaycareDetails] =
    useState<SchoolDaycareDetails>({
      schoolName: "",
      phoneNumber: "",
      address: "",
      dismissalTime: "",
    });

  const renderChildForm = () => {
    switch (activeFormIndex) {
      case 0:
        return (
          <ChildInformationForm
            childDetails={childDetails}
            setChildDetails={setChildDetails}
          />
        );
      case 1:
        return (
          <SchoolDaycareForm
            schoolDaycareDetails={schoolDaycareDetails}
            setSchoolDaycareDetails={setSchoolDaycareDetails}
          />
        );
      case 2:
        return <ChildProviderForm />;
      default:
        return <Text>Error</Text>;
    }
  };

  return (
    <>
      <IntakeHeader
        primaryTitle="Add child"
        secondaryTitle="Initiate New Case"
      />
      <VStack
        style={{ padding: "48px 96px 36px" }}
        spacing="50px"
        align="flex-start"
        border="1px"
        borderColor="gray.100"
      >
        <Button
          color="blue.400"
          variant="link"
          onClick={() => {
            history.goBack();
            // TODO: Fix route to navigate back to individual details entry intake page
          }}
          leftIcon={<Icon as={ChevronLeft} h="16px" />}
        >
          Back to case individuals
        </Button>
        <FormSelector
          formTitles={["Child information", "School / Daycare", "Providers"]}
          activeForm={activeFormIndex}
          onClick={setActiveFormIndex}
        />
      </VStack>
      {renderChildForm()}
      {/* TODO: Add footer component */}
    </>
  );
};

export default AddChild;
