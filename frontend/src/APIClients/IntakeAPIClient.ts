import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import { Case } from "../types/CasesContextTypes";

const post = async ({ formData }: { formData: FormData }): Promise<Case> => {
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

const get = async (
  intakeStatus: string,
  page: number,
  limit: number,
): Promise<Case[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.get<Case[]>("/intake", {
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
      caseReferral: {
        referringWorkerName: intake.caseReferral.referringWorkerName,
        referringWorkerContact: intake.caseReferral.referringWorkerContact,
        cpinFileNumber: intake.caseReferral.cpinFileNumber,
        cpinFileType: intake.caseReferral.cpinFileType,
        familyName: intake.caseReferral.familyName,
        referralDate: new Date(intake.caseReferral.referralDate).toLocaleDateString("en-GB"),
      },
      courtInformation: intake.courtInformation,
      children: intake.children,
      caregivers: intake.caregivers,
      programDetails: intake.programDetails,
    }));

    return mappedData;
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

export default { post, get, deleteIntake };
