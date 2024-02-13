import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import { Cadences } from "../types/CadenceDetailTypes";

interface VisitCadence {
  date: string;
  frequency: string;
  intake_id: number;
  time: string;
  child_id?: number;
  family_member?: string;
  id?: number;
  notes?: string;
  caregiver_id?: number;
}

const post = async (
  date: string,
  frequency: string,
  intake_id: number,
  time: string,
  child_id?: number,
  family_member?: string,
  id?: number,
  notes?: string,
  caregiver_id?: number,
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

    const { data } = await baseAPIClient.post("/cadence", visitCadenceData, {
      headers: { Authorization: bearerToken },
    });
    console.log(data);
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

const getById = async (intake_id: number): Promise<Cadences> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.get<VisitCadence[]>(
      `/cadence/${intake_id}`,
      {
        headers: { Authorization: bearerToken },
        params: {
          intake_id,
        },
      },
    );

    const mappedData: Cadences = data.map((cadence) => ({
      date: cadence.date,
      frequency: cadence.frequency,
      intake_id: cadence.intake_id,
      time: cadence.time,
      child_id: cadence.child_id ? cadence.child_id : undefined,
      family_member: cadence.family_member ? cadence.family_member : undefined,
      id: cadence.id ? cadence.id : undefined,
      notes: cadence.notes ? cadence.notes : undefined,
      caregiver_id: cadence.caregiver_id ? cadence.caregiver_id : undefined,
    }));

    return mappedData;
  } catch (error) {
    return error;
  }
};

export default { post, get, getById };
