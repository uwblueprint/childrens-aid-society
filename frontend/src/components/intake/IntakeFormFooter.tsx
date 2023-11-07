/* eslint-disable import/no-cycle */
import React from "react";
import { ArrowRight } from "react-feather";
import { useHistory } from "react-router-dom";
import { Box, Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import SubmitCaseModal from "./SubmitCaseModal";
import SubmitErrorModal from "./SubmitErrorModal";
import { ReferralDetails } from "./ReferralForm";
import { CourtDetails } from "./CourtInformationForm";
import { ProgramDetails } from "./ProgramForm";
import { Children } from "./child-information/AddChildPage";
import { Caregivers } from "./NewCaregiverModal";
import { Case } from "../../types/CasesContextTypes";
import CaseStatus from "../../types/CaseStatus";
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";

export type CurrentStepLayout = {
  nextBtnTxt: string;
  showClearPageBtn: boolean;
};

export type IntakeFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  nextButtonText: string;
  showClearPageBtn?: boolean;
  isStepComplete: () => boolean;
  registrationLoading: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
  // fields for creating intake put request
  referralDetails?: ReferralDetails;
  courtDetails?: CourtDetails;
  programDetails?: ProgramDetails;
  childrens?: Children;
  caregivers?: Caregivers;
};

const IntakeFooter = ({
  nextButtonRef,
  nextButtonText,
  showClearPageBtn,
  isStepComplete,
  registrationLoading,
  nextStepCallBack,
  clearFields,
  referralDetails,
  courtDetails,
  programDetails,
  childrens,
  caregivers,
}: IntakeFooterProps): React.ReactElement => {
  const toast = useToast();
  // TODO: remove useHistory once dashboard is implemented
  const history = useHistory();

  const {
    onOpen: onOpenSubmitCase,
    isOpen: isOpenSubmitCase,
    onClose: onCloseSubmitCase,
  } = useDisclosure();

  const {
    isOpen: isOpenSubmitError,
    onClose: onCloseSubmitError,
  } = useDisclosure();

  const onNextStep = () => {
    if (isStepComplete()) {
      nextStepCallBack();
    } else {
      toast({
        title: "Form does not pass validation.",
        description:
          "Please complete all form fields according to requirements.",
        variant: "subtle",
        duration: 3000,
        status: "error",
        position: "top",
      });
    }
  };

  const submitForm = async () => {
    console.log("clicked");
    console.log(referralDetails);
    console.log(courtDetails);
    console.log(childrens);
    console.log(programDetails);
    if (
      referralDetails &&
      courtDetails &&
      childrens &&
      caregivers &&
      programDetails
    ) {
      const intakeData: Case = {
        user_id: 1,
        case_id: 1,
        intakeStatus: CaseStatus.ACTIVE,
        caseReferral: {
          referringWorkerName: referralDetails.referringWorker,
          referringWorkerContact: referralDetails.referringWorkerContact,
          cpinFileNumber: parseInt(referralDetails.cpinFileNumber, 10),
          cpinFileType: referralDetails.cpinFileType,
          familyName: referralDetails.familyName,
          referralDate: referralDetails.referralDate,
        },
        courtInformation: {
          courtStatus: courtDetails.currentCourtStatus,
          orderReferral: 0,
          firstNationHeritage: courtDetails.firstNationHeritage,
          firstNationBand: courtDetails.firstNationBand,
        },
        children: childrens.map((child) => {
          return {
            childInfo: {
              name: child.childDetails.childName,
              dateOfBirth: child.childDetails.dateOfBirth,
              cpinFileNumber: parseInt(child.childDetails.cpinFileNumber, 10),
              serviceWorker: child.childDetails.workerName,
              specialNeeds: child.childDetails.specialNeeds,
              concerns: [], // don't know field
            },
            daytimeContact: {
              name: child.schoolDetails.schoolName,
              contactInfo: child.schoolDetails.schoolPhoneNo,
              address: child.schoolDetails.schoolAddress,
              dismissalTime: child.schoolDetails.dismissalTime,
            },
            provider: child.providers.map((provider) => {
              return {
                name: provider.providerName,
                fileNumber: parseInt(provider.providerFileNo, 10),
                primaryPhoneNumber: parseInt(provider.primaryPhoneNo, 10),
                secondaryPhoneNumber: provider.secondaryPhoneNo
                  ? parseInt(provider.secondaryPhoneNo, 10)
                  : 0,
                email: provider.email ? provider.email : "",
                address: provider.address,
                additionalContactNotes: provider.contactNotes
                  ? provider.contactNotes
                  : "",
                relationshipToChild: provider.relationship,
              };
            }),
          };
        }),
        caregivers: caregivers.map((cg) => {
          return {
            name: cg.caregiverName,
            dateOfBirth: cg.dateOfBirth,
            primaryPhoneNumber: parseInt(cg.primaryPhoneNo, 10),
            secondaryPhoneNumber: cg.secondaryPhoneNo
              ? parseInt(cg.secondaryPhoneNo, 10)
              : 0,
            additionalContactNotes: cg.contactNotes ? cg.contactNotes : "",
            address: cg.address,
            relationshipToChild: cg.relationship,
            individualConsiderations: cg.indivConsiderations
              ? cg.indivConsiderations
              : "",
          };
        }),
        programDetails: {
          transportRequirements: programDetails.transportationRequirements,
          schedulingRequirements: programDetails.schedulingRequirements,
          suggestedStartDate: programDetails.suggestedStartDate,
          shortTermGoals: programDetails.shortTermGoals,
          longTermGoals: programDetails.longTermGoals,
          familialConcerns: programDetails.familialConcerns,
          permittedIndividuals: [
            {
              name: "temp",
              phoneNumber: 123,
              relationshipToChildren: "temp",
              additionalNotes: "temp",
            },
          ],
        },
      };
      console.log(intakeData);
      await IntakeAPIClient.post(intakeData);
      onNextStep();
    } else {
      onNextStep();
    }
  };

  return (
    <Flex
      bg="gray.50"
      boxShadow="sm"
      minH="92px"
      width="100vw"
      align="center"
      justify={{ sm: "center", md: "end" }}
      flexWrap="wrap"
      padding="20px"
      left="0"
      position="fixed"
      bottom="0"
      zIndex="5"
    >
      {showClearPageBtn && (
        <Button
          width={{ sm: "95vw", md: "45vw", lg: "auto" }}
          variant="tertiary"
          height="48px"
          mb={{ sm: 4, md: 0 }}
          mr={{ sm: 0, md: 4 }}
          onClick={() => {
            if (clearFields) {
              clearFields();
            }
          }}
        >
          Clear page
        </Button>
      )}

      <Button
        ref={nextButtonRef}
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="48px"
        loadingText="Submitting"
        type="submit"
        isLoading={registrationLoading}
        onClick={() => {
          if (nextButtonText === "Submit case") {
            onOpenSubmitCase();
          } else if (nextButtonText === "Return to dashboard") {
            // TODO: remove this once dashboard is implemented
            history.goBack();
          } else {
            onNextStep();
          }
        }}
      >
        <Box pr="5px">{nextButtonText}</Box>
        <ArrowRight />
      </Button>

      <SubmitCaseModal
        isOpen={isOpenSubmitCase}
        onClick={submitForm}
        onClose={onCloseSubmitCase}
      />
      <SubmitErrorModal
        // TODO: implement error modal behaviour
        isOpen={isOpenSubmitError}
        onClose={onCloseSubmitError}
      />
    </Flex>
  );
};

export default IntakeFooter;
