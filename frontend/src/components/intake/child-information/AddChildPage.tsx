import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import IntakeHeader from "../IntakeHeader";
import IntakeSteps from "../intakeSteps";
import { Providers } from "../NewProviderModal";
import ChildInformationForm, { ChildDetails } from "./ChildInformationForm";
import ChildProviderForm from "./ChildProviderForm";
import FormSelector from "./FormSelector";
import SchoolDaycareForm, { SchoolDetails } from "./SchoolDaycareForm";

enum AddChildSteps {
  CHILD_INFORMATION_FORM,
  SCHOOL_DAYCARE_FORM,
  CHILD_PROVIDER_FORM,
}

type AddChildProps = {
  allProviders: Providers;
  setAllProviders: React.Dispatch<React.SetStateAction<Providers>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  childrens: Children;
  setChildren: React.Dispatch<React.SetStateAction<Children>>;
  selectedIndexChild: number;
  referrer: string;
};

export type ChildrenDetails = {
  childDetails: ChildDetails;
  schoolDetails: SchoolDetails;
  providers: Providers;
};
export type Children = ChildrenDetails[];

const AddChild = ({
  allProviders,
  setAllProviders,
  setStep,
  childrens,
  setChildren,
  selectedIndexChild,
  referrer,
}: AddChildProps): React.ReactElement => {
  const [activeFormIndex, setActiveFormIndex] = useState(0);

  const [childDetails, setChildDetails] = useState<ChildDetails>({
    childName: "",
    cpinFileNumber: "",
    dateOfBirth: "",
    workerName: "",
    specialNeeds: "",
    childBehaviours: "",
  });
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>({
    schoolName: "",
    schoolPhoneNo: "",
    schoolAddress: "",
    dismissalTime: "",
  });
  const [providers, setProviders] = useState<Providers>([]);

  const requiredInfomationMissing: boolean =
    !childDetails.childName ||
    !childDetails.cpinFileNumber ||
    !childDetails.dateOfBirth;

  // TODO: Check other required fields

  const childFormSubmitHandler = () => {
    const updatedChild = {
      childDetails: { ...childDetails },
      schoolDetails: { ...schoolDetails },
      providers: [...providers],
    };

    if (selectedIndexChild >= 0) {
      childrens.splice(selectedIndexChild, 1, updatedChild);
    } else {
      childrens.push(updatedChild);
    }

    setChildren([...childrens]);
    if (referrer === "intake") {
      setStep(IntakeSteps.INDIVIDUAL_DETAILS);
    } else {
      // console.log("back");
    }
  };

  useEffect(() => {
    if (selectedIndexChild >= 0) {
      setChildDetails(childrens[selectedIndexChild].childDetails);
      setSchoolDetails(childrens[selectedIndexChild].schoolDetails);
      setProviders(childrens[selectedIndexChild].providers);
    }
  }, [childrens, selectedIndexChild]);

  const renderChildForm = () => {
    switch (activeFormIndex) {
      case AddChildSteps.CHILD_INFORMATION_FORM:
        return (
          <ChildInformationForm
            childDetails={childDetails}
            setChildDetails={setChildDetails}
          />
        );
      case AddChildSteps.SCHOOL_DAYCARE_FORM:
        return (
          <SchoolDaycareForm
            schoolDetails={schoolDetails}
            setSchoolDetails={setSchoolDetails}
          />
        );
      case AddChildSteps.CHILD_PROVIDER_FORM:
        return (
          <ChildProviderForm
            providers={providers}
            setProviders={setProviders}
            allProviders={allProviders}
            setAllProviders={setAllProviders}
          />
        );
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
          leftIcon={<ArrowLeft />}
          onClick={() => {
            if (referrer === "intake") {
              setStep(IntakeSteps.INDIVIDUAL_DETAILS);
            } else {
              // console.log("back");
            }
          }}
          variant="tertiary"
        >
          Back to case individuals
        </Button>
        <FormSelector
          formTitles={["Child information", "School / Daycare", "Providers"]}
          activeForm={activeFormIndex}
          onClick={setActiveFormIndex}
        />
      </VStack>

      <Box marginBottom="100px">{renderChildForm()}</Box>

      <Box
        bg="white"
        height="87px"
        bottom="0"
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        position="fixed"
        shadow="0px -4px 12px rgba(226, 225, 236, 0.4), 0px -8px 24px rgba(226, 225, 236, 0.25)"
      >
        <Button
          type="submit"
          mr="96px"
          // remove when error checking is implemented
          disabled={requiredInfomationMissing}
          onClick={childFormSubmitHandler}
        >
          Save child information
        </Button>
        {/* TODO: Add cancel button */}
      </Box>
    </>
  );
};

export default AddChild;
