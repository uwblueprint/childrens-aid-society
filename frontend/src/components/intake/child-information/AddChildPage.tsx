import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import IntakeHeader from "../IntakeHeader";
import IntakeSteps from "../intakeSteps";
import { Providers } from "../NewProviderModal";
import OverviewSection from "../../../types/OverviewSection";
import ChildInformationForm, { ChildDetails } from "./ChildInformationForm";
import ChildProviderForm from "./ChildProviderForm";
import FormSelector from "./FormSelector";
import SchoolDaycareForm, { SchoolDetails } from "./SchoolDaycareForm";
import childAPIClient from "../../../APIClients/ChildAPIClient";
import { Children, ChildrenDetails } from "../../../types/ChildTypes";

enum AddChildSteps {
  CHILD_INFORMATION_FORM,
  SCHOOL_DAYCARE_FORM,
  CHILD_PROVIDER_FORM,
}

type AddChildProps = {
  allProviders: Providers;
  setAllProviders: (
    newProviders: Providers,
  ) => void | React.Dispatch<React.SetStateAction<Providers>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  childrens: Children;
  setChildren: (newChildren: Children) => void;
  selectedIndexChild: number;
  setSelectedIndexChild: React.Dispatch<React.SetStateAction<number>>;
  referrer: string;
  caseNumber?: number;
};

const AddChild = ({
  allProviders,
  setAllProviders,
  setStep,
  childrens,
  setChildren,
  selectedIndexChild,
  setSelectedIndexChild,
  referrer,
  caseNumber,
}: AddChildProps): React.ReactElement => {
  const [activeFormIndex, setActiveFormIndex] = useState(0);

  const [childDetails, setChildDetails] = useState<ChildDetails>({
    childName: "",
    cpinFileNumber: "",
    dateOfBirth: "",
    workerName: "",
    specialNeeds: "",
    childBehaviours: "",
    childId: "",
  });
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>({
    schoolName: "",
    schoolPhoneNo: "",
    schoolAddress: "",
    dismissalTime: "",
    schoolId: "",
  });
  const [providers, setProviders] = useState<Providers>([]);

  const requiredInfomationMissing: boolean =
    !childDetails.childName ||
    !childDetails.cpinFileNumber ||
    !childDetails.dateOfBirth;
  // TODO: Check other required fields

  const childFormSubmitHandler = () => {
    const child: ChildrenDetails = {
      childDetails: { ...childDetails },
      schoolDetails: { ...schoolDetails },
      providers: [...providers],
    };

    if (selectedIndexChild >= 0) {
      childrens.splice(selectedIndexChild, 1, child);
      if (caseNumber) {
        childAPIClient.put({
          updatedChild: child,
          intakeId: caseNumber,
        });
      }
    } else {
      childrens.push(child);
      if (caseNumber) {
        childAPIClient.post({ newChild: child, intakeId: caseNumber });
      }
    }

    setChildren([...childrens]);
    if (referrer === "intake") {
      setStep(IntakeSteps.INDIVIDUAL_DETAILS);
    } else if (referrer === "caseOverview") {
      setSelectedIndexChild(-1);
      setStep(OverviewSection.MAIN_SECTION);
    }
  };

  useEffect(() => {
    if (selectedIndexChild >= 0) {
      setChildDetails(childrens[selectedIndexChild].childDetails);
      setSchoolDetails(childrens[selectedIndexChild].schoolDetails);
      setProviders(childrens[selectedIndexChild].providers);
    } else {
      setChildDetails({
        childName: "",
        cpinFileNumber: "",
        dateOfBirth: "",
        workerName: "",
        specialNeeds: "",
        childBehaviours: "",
        childId: "",
      });
      setSchoolDetails({
        schoolName: "",
        schoolPhoneNo: "",
        schoolAddress: "",
        dismissalTime: "",
        schoolId: "",
      });
      setProviders([]);
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
        primaryTitle={selectedIndexChild === -1 ? "Add child" : "Edit Child"}
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
            } else if (referrer === "caseOverview") {
              setSelectedIndexChild(-1);
              setStep(OverviewSection.MAIN_SECTION);
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
