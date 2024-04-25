import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import CaseStatus from "../types/CaseStatus";
import { Case } from "../types/CasesContextTypes";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import baseAPIClient from "./BaseAPIClient";

interface Intake {
  userId: number;
  caseId: number;
  intakeStatus: string;
  intakeMeetingNotes: string;
  caseReferral: {
    referringWorker: string;
    referringWorkerContact: string;
    cpinFileNumber: string;
    cpinFileType: string;
    familyName: string;
    referralDate: string;
  };
  courtInformation: {
    courtStatus: string;
    orderReferral: File; // FormData
    firstNationHeritage: string;
    firstNationBand: string;
  };
  programDetails: {
    transportationRequirements: string;
    schedulingRequirements: string;
    suggestedStartDate: string;
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const post = async (formData: any): Promise<Case> => {  
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
    throw new Error("Error: can't make new intake");
  }
};

const search = async (searchParam: string): Promise<Case[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;

  const url = "/intake/search";

  try {
    const { data } = await baseAPIClient.get<Intake[]>(url, {
      headers: { Authorization: bearerToken },
      params: {
        family_name: searchParam,
      },
    });

    const mappedDataCase: Case[] = data.map((intake: Intake) => ({
      user_id: intake.userId.toString(),
      case_id: intake.caseId.toString(),
      intakeStatus: <CaseStatus>intake.intakeStatus,
      intakeMeetingNotes: intake.intakeMeetingNotes,
      caseReferral: {
        referringWorker: intake.caseReferral.referringWorker,
        referringWorkerContact: intake.caseReferral.referringWorkerContact,
        cpinFileNumber: intake.caseReferral.cpinFileNumber,
        cpinFileType: intake.caseReferral.cpinFileType,
        familyName: intake.caseReferral.familyName,
        referralDate: new Date(
          intake.caseReferral.referralDate,
        ).toLocaleDateString("en-GB"),
      },
      courtInformation: {
        courtStatus: intake.courtInformation.courtStatus,
        orderReferral: intake.courtInformation.orderReferral, 
        firstNationHeritage: intake.courtInformation.firstNationHeritage,
        firstNationBand: intake.courtInformation.firstNationBand,
      },
      children: [
        {
          childInfo: {
            name: "",
            dateOfBirth: "",
            cpinFileNumber: 0,
            serviceWorker: "",
            specialNeeds: "",
            concerns: [],
          },
          daytimeContact: {
            name: "",
            contactInfo: "",
            address: "",
            dismissalTime: "",
          },
          provider: [
            {
              name: "",
              fileNumber: 0,
              primaryPhoneNumber: 0,
              secondaryPhoneNumber: 0,
              email: "",
              address: "",
              additionalContactNotes: "",
              relationshipToChild: "",
            },
          ],
        },
      ],
      caregivers: [
        {
          name: "",
          dateOfBirth: "",
          primaryPhoneNumber: 0,
          secondaryPhoneNumber: 0,
          additionalContactNotes: "",
          address: "",
          relationshipToChild: "",
          individualConsiderations: "",
        },
      ],
      programDetails: {
        transportationRequirements:
          intake.programDetails.transportationRequirements,
        schedulingRequirements: intake.programDetails.schedulingRequirements,
        suggestedStartDate: intake.programDetails.suggestedStartDate,
        shortTermGoals: [],
        longTermGoals: [],
        familialConcerns: [],
        permittedIndividuals: [
          {
            providerName: "",
            phoneNo: "",
            relationshipToChild: "",
            additionalNotes: "",
          },
        ],
      },
    }));

    return mappedDataCase;
  } catch (error) {
    throw new Error("Error: can't get intake serach results");
  }
};

const get = async (
  intakeStatus: CaseStatus,
  page: number,
  limit: number,
): Promise<Case[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;

  const url = "/intake";

  try {
    const { data } = await baseAPIClient.get<Intake[]>(url, {
      headers: { Authorization: bearerToken },
      params: {
        intake_status: intakeStatus,
        page_number: page,
        page_limit: limit,
      },
    });

    const mappedData = data.map((intake: Intake) => ({
      user_id: intake.userId.toString(),
      case_id: intake.caseId.toString(),
      intakeStatus: <CaseStatus>intake.intakeStatus,
      intakeMeetingNotes: intake.intakeMeetingNotes,
      caseReferral: {
        referringWorker: intake.caseReferral.referringWorker,
        referringWorkerContact: intake.caseReferral.referringWorkerContact,
        cpinFileNumber: intake.caseReferral.cpinFileNumber,
        cpinFileType: intake.caseReferral.cpinFileType,
        familyName: intake.caseReferral.familyName,
        referralDate: new Date(
          intake.caseReferral.referralDate,
        ).toLocaleDateString("en-GB"),
      },
      courtInformation: {
        courtStatus: intake.courtInformation.courtStatus,
        orderReferral: intake.courtInformation.orderReferral, 
        firstNationHeritage: intake.courtInformation.firstNationHeritage,
        firstNationBand: intake.courtInformation.firstNationBand,
      },
      children: [
        {
          childInfo: {
            name: "",
            dateOfBirth: "",
            cpinFileNumber: 0,
            serviceWorker: "",
            specialNeeds: "",
            concerns: [],
          },
          daytimeContact: {
            name: "",
            contactInfo: "",
            address: "",
            dismissalTime: "",
          },
          provider: [
            {
              name: "",
              fileNumber: 0,
              primaryPhoneNumber: 0,
              secondaryPhoneNumber: 0,
              email: "",
              address: "",
              additionalContactNotes: "",
              relationshipToChild: "",
            },
          ],
        },
      ],
      caregivers: [
        {
          name: "",
          dateOfBirth: "",
          primaryPhoneNumber: 0,
          secondaryPhoneNumber: 0,
          additionalContactNotes: "",
          address: "",
          relationshipToChild: "",
          individualConsiderations: "",
        },
      ],
      programDetails: {
        transportationRequirements:
          intake.programDetails.transportationRequirements,
        schedulingRequirements: intake.programDetails.schedulingRequirements,
        suggestedStartDate: intake.programDetails.suggestedStartDate,
        shortTermGoals: [],
        longTermGoals: [],
        familialConcerns: [],
        permittedIndividuals: [
          {
            providerName: "",
            phoneNo: "",
            relationshipToChild: "",
            additionalNotes: "",
          },
        ],
      },
    }));

    return mappedData;
  } catch (error) {
    throw new Error("Error: can't get intakes");
  }
};

const put = async ({
  changedData,
  intakeID,
}: {
  changedData: Record<string, string>;
  intakeID: number;
}): Promise<Case> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.put(
      `/intake/${intakeID}`,
      changedData,
      {
        headers: { Authorization: bearerToken },
      },
    );
    return data;
  } catch (error) {
    throw new Error("Error: can't update intake");
  }
};

const deleteIntake = async (intakeId: number): Promise<void> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const response = await baseAPIClient.delete(`/intake/${intakeId}`, {
      headers: { Authorization: bearerToken },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error: can't delete intake");
  }
};
export default { post, get, put, deleteIntake, search };
