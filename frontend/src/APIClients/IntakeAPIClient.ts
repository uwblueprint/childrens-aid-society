import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import { Case } from "../types/CasesContextTypes";
import CaseStatus from "../types/CaseStatus";

interface Intake {
  user_id: number;
  id: number;
  referring_worker_name: string;
  referring_worker_contact: string;
  cpin_number: string;
  cpin_file_type: string;
  family_name: string;
  intake_status: string;
  referral_date: string;
  court_status: string;
  first_nation_heritage: string;
  first_nation_band: string;
  transportation_requirements: string;
  scheduling_requirements: string;
  suggested_start_date: string;
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
      case_id: intake.id.toString(),
      intakeStatus: <CaseStatus>intake.intake_status,
      caseReferral: {
        referringWorkerName: intake.referring_worker_name,
        referringWorkerContact: intake.referring_worker_contact,
        cpinFileNumber: parseInt(intake.cpin_number, 20),
        cpinFileType: intake.cpin_file_type,
        familyName: intake.family_name,
        referralDate: new Date(intake.referral_date).toLocaleDateString(
          "en-GB",
        ),
      },
      courtInformation: {
        courtStatus: intake.court_status,
        orderReferral: 0,
        firstNationHeritage: intake.first_nation_heritage,
        firstNationBand: intake.first_nation_band,
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
        transportRequirements: intake.transportation_requirements,
        schedulingRequirements: intake.scheduling_requirements,
        suggestedStartDate: intake.suggested_start_date,
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
