import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Button,
  Heading,
  VStack
} from "@chakra-ui/react";
import PromptBox from "./PromptBox";
import * as Routes from "../../constants/Routes";
import IndividualDetails from "../pages/IndividualDetails";


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
          buttonText="Add child"
        />
        <PromptBox 
          headerText="Caregivers" 
          descriptionText="No caregivers have been added to the case yet. " 
          buttonText="Add caregiver"
        />
      </VStack>
      <Button 
        onClick={() => {
          prevStep();
        }}
      >
        Previous Button
      </Button>
      <Button
        onClick={() => {
          nextStep();
        }}
      >
        Next Button
      </Button>
    </React.Fragment>

  );
};

export default IndividualDetailsEntry;