import { Box, Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";
/* eslint-disable import/no-cycle */
import React from "react";
import { ArrowRight } from "react-feather";
import { useHistory } from "react-router-dom";
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";
import { useStepValueContext } from "../../contexts/IntakeValueContext";
import { Caregivers } from "../../types/CaregiverDetailTypes";
import CaseStatus from "../../types/CaseStatus";
import { PermittedIndividuals } from "./PermittedIndividualsModal";
import SubmitCaseModal from "./SubmitCaseModal";
import SubmitErrorModal from "./SubmitErrorModal";
import { Children } from "./child-information/AddChildPage";

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
  childrens?: Children;
  caregivers?: Caregivers;
  permittedIndividuals?: PermittedIndividuals;
  isButtonDisabled?: boolean;
};

const IntakeFooter = ({
  nextButtonRef,
  nextButtonText,
  showClearPageBtn,
  isStepComplete,
  registrationLoading,
  nextStepCallBack,
  clearFields,
  childrens,
  caregivers,
  permittedIndividuals,
  isButtonDisabled,
}: IntakeFooterProps): React.ReactElement => {
  const toast = useToast();
  // TODO: remove useHistory once dashboard is implemented
  const history = useHistory();

  const { id, referralDetails, courtDetails, programDetails, intakeStatus } =
    useStepValueContext();

  const {
    onOpen: onOpenSubmitCase,
    isOpen: isOpenSubmitCase,
    onClose: onCloseSubmitCase,
  } = useDisclosure();

  const { isOpen: isOpenSubmitError, onClose: onCloseSubmitError } =
    useDisclosure();

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

  const appendFormData = (formData: FormData, data: any, parentKey: string) => {
    Object.keys(data).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const nestedKey = parentKey ? `${parentKey}[${key}]` : key;
        if (typeof data[key] === 'object' && !Array.isArray(data[key]) && nestedKey !== 'courtInformation[orderReferral]') {
          console.log('hi dont show me', data[key])
          appendFormData(formData, data[key], nestedKey);
        } else if (nestedKey === 'courtInformation[orderReferral]'){
          console.log('hi show me', data[key])
          formData.append(nestedKey, data[key]);
        }
        else {
          formData.append(nestedKey, JSON.stringify(data[key]));
        }
      }
  });
  }

  const submitForm = async () => {
    if (id && childrens && caregivers && permittedIndividuals) {
      const updatedData: {
        changedData: Record<string, string>;
        intakeID: number;
      } = {
        changedData: {
          intake_status: CaseStatus[intakeStatus as keyof typeof CaseStatus],
          intake_meeting_notes: "",
          referring_worker_name: referralDetails.referringWorker,
          referring_worker_contact: referralDetails.referringWorkerContact,
          cpin_number: referralDetails.cpinFileNumber,
          cpin_file_type: referralDetails.cpinFileType || "INVESTIGATION",
          referral_date: referralDetails.referralDate,
          court_status: courtDetails.courtStatus
            .toUpperCase()
            .replace(/ /g, "_"), // for enum
          court_order_file: "file binary",
          first_nation_heritage:
            courtDetails.firstNationHeritage.toUpperCase().replace(/ /g, "_") || // for enum
            "FIRST_NATION_REGISTERED",
          first_nation_band: courtDetails.firstNationBand,

          transportation_requirements:
            programDetails.transportationRequirements,
          scheduling_requirements: programDetails.schedulingRequirements,
          suggested_start_date: programDetails.suggestedStartDate,
        },
        intakeID: parseInt(id, 10),
      };
      await IntakeAPIClient.put(updatedData);
      onNextStep();
    } else if (
      referralDetails &&
      courtDetails &&
      childrens &&
      caregivers &&
      programDetails &&
      permittedIndividuals
    ) {
      console.log("hi there", courtDetails.orderReferral);
      const intakeData = {
        userId: 1,
        intakeStatus: CaseStatus.ACTIVE,
        caseReferral: {
          referringWorkerName: referralDetails.referringWorker,
          referringWorkerContact: referralDetails.referringWorkerContact,
          cpinFileNumber: referralDetails.cpinFileNumber,
          cpinFileType: referralDetails.cpinFileType || "INVESTIGATION",
          familyName: referralDetails.familyName,
          referralDate: referralDetails.referralDate,
        },
        courtInformation: {
          courtStatus: courtDetails.courtStatus
            .toUpperCase()
            .replace(/ /g, "_"), // for enum
          orderReferral: courtDetails.orderReferral,
          firstNationHeritage:
            courtDetails.firstNationHeritage.toUpperCase().replace(/ /g, "_") || // for enum
            "FIRST_NATION_REGISTERED",
          firstNationBand: courtDetails.firstNationBand,
        },
        children: childrens.map((child) => {
          return {
            childInfo: {
              name: child.childDetails.childName,
              dateOfBirth: child.childDetails.dateOfBirth,
              cpinFileNumber: child.childDetails.cpinFileNumber,
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
                fileNumber: provider.providerFileNo,
                primaryPhoneNumber: provider.primaryPhoneNo,
                secondaryPhoneNumber: provider.secondaryPhoneNo
                  ? provider.secondaryPhoneNo
                  : "",
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
            primaryPhoneNumber: cg.primaryPhoneNo,
            secondaryPhoneNumber: cg.secondaryPhoneNo,
            additionalContactNotes: cg.contactNotes,
            address: cg.address,
            relationshipToChild: cg.relationship
              .toUpperCase()
              .replace(/ /g, "_"), // for enum,
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
          permittedIndividuals: permittedIndividuals.map((individual) => {
            return {
              name: individual.providerName,
              phoneNumber: individual.phoneNo,
              relationshipToChildren: individual.relationshipToChild,
              additionalNotes: individual.additionalNotes,
            };
          }),
        },
      };

      const intakeFormData = new FormData(); 
      appendFormData(intakeFormData, intakeData, '');

      await IntakeAPIClient.post(intakeFormData);
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
        disabled={isButtonDisabled}
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
