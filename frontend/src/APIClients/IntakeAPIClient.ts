import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

export type IntakeResponse = {
  user_id: string | number;
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
    orderReferral: number;
    firstNationHeritage: string;
    firstNationBand: string;
  };
  children: [
    {
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
      provider: [
        {
          name: string;
          fileNumber: number;
          primaryPhoneNumber: number;
          secondaryPhoneNumber: number;
          email: string;
          address: string;
          additionalContactNotes: string;
          relationshipToChild: string;
        },
      ];
    },
  ];
  caregivers: [
    {
      name: string;
      dateOfBirth: string;
      primaryPhoneNumber: number;
      secondaryPhoneNumber: number;
      additionalContactNotes: string;
      address: string;
      relationshipToChild: string;
      individualConsiderations: string;
    },
  ];
  programDetails: {
    transportRequirements: string;
    schedulingRequirements: string;
    suggestedStartDate: string;
    shortTermGoals: string[];
    longTermGoals: string[];
    familialConcerns: string[];
    permittedIndividuals: [
      {
        name: string;
        phoneNumber: number;
        relationshipToChildren: string;
        additionalNotes: string;
      },
    ];
  };
};

const post = async ({
  formData,
}: {
  formData: FormData;
}): Promise<IntakeResponse> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.post("/intake", formData, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const get = async (parameter: string): Promise<IntakeResponse[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.get(`/intake/${parameter}`, {
      headers: { Authorization: bearerToken },
    });
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export default { post, get };
