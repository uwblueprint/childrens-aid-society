import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

interface VisitCadence {
  date: string;
  frequency: string;
  intake_id: number;
  time: string;
  caregiver_id?: number;
  child_id?: number;
  family_member?: string;
  id?: number;
  notes?: string;
}

const post = async (
  date: string,
  frequency: string,
  intake_id: number,
  time: string,
  caregiver_id?: number,
  child_id?: number,
  family_member?: string,
  id?: number,
  notes?: string,
): Promise<VisitCadence> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    let visitCadenceData = {
      date,
      frequency,
      intake_id,
      time,
    };
    if (caregiver_id) {
      const updatedData = {
        ...visitCadenceData,
        caregiver_id,
      };
      visitCadenceData = updatedData;
    }
    if (child_id) {
      const updatedData = {
        ...visitCadenceData,
        child_id,
      };
      visitCadenceData = updatedData;
    }
    if (family_member) {
      const updatedData = {
        ...visitCadenceData,
        family_member,
      };
      visitCadenceData = updatedData;
    }
    if (id) {
      const updatedData = {
        ...visitCadenceData,
        id,
      };
      visitCadenceData = updatedData;
    }
    if (notes) {
      const updatedData = {
        ...visitCadenceData,
        notes,
      };
      visitCadenceData = updatedData;
    }
    console.log(visitCadenceData);

    const { data } = await baseAPIClient.post("/cadence", visitCadenceData, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    console.log(error);
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
