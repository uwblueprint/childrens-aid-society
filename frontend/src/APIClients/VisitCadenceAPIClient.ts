import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

interface VisitCadence {
  caregiver_id: number;
  child_id: number;
  date: string;
  family_member: string;
  frequency: string;
  id: number;
  intake_id: number;
  notes: string;
  time: string;
}

const post = async ({
  formData,
}: {
  formData: FormData;
}): Promise<VisitCadence> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.post("/cadence", formData, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const get = async (intakeId: number): Promise<VisitCadence[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.get<VisitCadence[]>("/cadence", {
      headers: { Authorization: bearerToken },
      params: {
        intake_id: intakeId,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export default { post, get };
