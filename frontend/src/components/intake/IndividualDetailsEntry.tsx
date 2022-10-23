import React from "react";
import {
  Button,
  Heading,
  VStack
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import PromptBox from "./PromptBox";


export type IndividualDetailsEntryProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const IndividualDetailsEntry = ({
  nextStep,
  prevStep
}: IndividualDetailsEntryProp): React.ReactElement => {

  return (
    <React.Fragment key="IndividualDetailsEntry">
      <VStack padding="32px" spacing='24px'>
        <PromptBox 
          headerText="Children" 
          descriptionText="No children have been added to the case yet. " 
          buttonText="Add child"/>
        <PromptBox headerText="Caregivers" descriptionText="No caregivers have been added to the case yet. " buttonText="Add caregiver"/>
      </VStack>
      <Button 
        onClick={() => {
          // handleSubmit();
          prevStep();
        }}
      >
        Previous Button
      </Button>
      <Button
        onClick={() => {
          // handleSubmit();
          nextStep();
        }}
      >
        Next Button
      </Button>
    </React.Fragment>

  );
};

export default IndividualDetailsEntry;