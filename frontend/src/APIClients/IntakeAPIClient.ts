import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import { Case } from "../types/CasesContextTypes";
import CaseStatus from "../types/CaseStatus";

interface Intake {
  user_id: number;
  case_id: number;
  intake_status: string;
  caseReferral: {
    referringWorkerName: string;
    referringWorkerContact: string;
    cpinFileNumber: string;
    cpinFileType: string;
    familyName: string;
    referralDate: string;
  };
  courtInformation: {
    courtStatus: string;
    orderReferral: string;
    firstNationHeritage: string;
    firstNationBand: string;
  };
  programDetails: {
    transportationRequirements: string;
    schedulingRequirements: string;
    suggestedStartDate: string;
  };
}

const post = async (formData: Case): Promise<Case> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    console.log(formData);
    const { data } = await baseAPIClient.post("/intake", formData, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
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
  try {
    const { data } = await baseAPIClient.get<Intake[]>("/intake", {
      headers: { Authorization: bearerToken },
      params: {
        intake_status: intakeStatus,
        page_number: page,
        page_limit: limit,
      },
    });

    const mappedData: Case[] = data.map((intake) => ({
      user_id: intake.user_id.toString(),
      case_id: intake.case_id.toString(),
      intakeStatus: <CaseStatus>intake.intake_status,
      caseReferral: {
        referringWorkerName: intake.caseReferral.referringWorkerName,
        referringWorkerContact: intake.caseReferral.referringWorkerContact,
        cpinFileNumber: parseInt(intake.caseReferral.cpinFileNumber, 20),
        cpinFileType: intake.caseReferral.cpinFileType,
        familyName: intake.caseReferral.familyName,
        referralDate: new Date(
          intake.caseReferral.referralDate,
        ).toLocaleDateString("en-GB"),
      },
      courtInformation: {
        courtStatus: intake.courtInformation.courtStatus,
        orderReferral: 0,
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
        transportRequirements: intake.programDetails.transportationRequirements,
        schedulingRequirements: intake.programDetails.schedulingRequirements,
        suggestedStartDate: intake.programDetails.suggestedStartDate,
        shortTermGoals: [],
        longTermGoals: [],
        familialConcerns: [],
        permittedIndividuals: [
          {
            name: "",
            phoneNumber: 0,
            relationshipToChildren: "",
            additionalNotes: "",
          },
        ],
      },
    }));
    return mappedData;
  } catch (error) {
    return error;
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
    return error;
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
    return error;
  }
};
export default { post, get, put, deleteIntake };
