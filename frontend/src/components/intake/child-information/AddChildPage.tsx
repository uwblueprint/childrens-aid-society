import { Box, Button, Icon, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChevronLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import IntakeHeader from "../IntakeHeader";
import ChildInformationForm, { ChildDetails } from "./ChildInformationForm";
import ChildProviderForm from "./ChildProviderForm";
import FormSelector from "./FormSelector";
import SchoolDaycareForm from "./SchoolDaycareForm";

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

  const requiredInfomationMissing : boolean =
    !childDetails.childName || 
    !childDetails.cpinFileNumber ||
    !childDetails.dateOfBirth 
    // TODO: Check other required fields

  const childFormSubmitHandler = () => {
    console.log(childDetails)
    // TODO: Do something with the information
  }

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
        return <SchoolDaycareForm />;
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

      <Box 
        bg="white"
        height="87px"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        shadow="0px -4px 12px rgba(226, 225, 236, 0.4), 0px -8px 24px rgba(226, 225, 236, 0.25)"
      >
        <Button
          type="submit"
          mr="96px"
          disabled={requiredInfomationMissing}
          onClick={childFormSubmitHandler}
        >
          Save child information
        </Button>
      </Box>
    </>
  );
};

export default AddChild;
