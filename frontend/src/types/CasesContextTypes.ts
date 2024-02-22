import CaseStatus from "./CaseStatus";

export type Case = {
  user_id: string | number;
  case_id: string | number;
  intakeStatus: CaseStatus;
  caseReferral: {
    referringWorkerName: string;
    referringWorkerContact: string;
    cpinFileNumber: number;
    cpinFileType: string;
    familyName: string;
    referralDate: string;
  };
  courtInformation: {
    courtStatus: string;
    // **Come back here
    orderReferral: FormData; // File; // number; // File; // number;
    firstNationHeritage: string;
    firstNationBand: string;
  };
  children: {
    childInfo: {
      name: string;
      dateOfBirth: string;
      cpinFileNumber: number;
      serviceWorker: string;
      specialNeeds: string;
      concerns: string[];
    };
    daytimeContact: {
      name: string;
      contactInfo: string;
      address: string;
      dismissalTime: string;
    };
    provider: {
      name: string;
      fileNumber: number;
      primaryPhoneNumber: number;
      secondaryPhoneNumber: number;
      email: string;
      address: string;
      additionalContactNotes: string;
      relationshipToChild: string;
    }[];
  }[];
  caregivers: {
    name: string;
    dateOfBirth: string;
    primaryPhoneNumber: number;
    secondaryPhoneNumber: number;
    additionalContactNotes: string;
    address: string;
    relationshipToChild: string;
    individualConsiderations: string;
  }[];
  programDetails: {
    transportRequirements: string;
    schedulingRequirements: string;
    suggestedStartDate: string;
    shortTermGoals: string[];
    longTermGoals: string[];
    familialConcerns: string[];
    permittedIndividuals: {
      name: string;
      phoneNumber: number;
      relationshipToChildren: string;
      additionalNotes: string;
    }[];
  };
};

export type CasesContextType = Case[];

export type CasesContextActions = "UPDATE";
