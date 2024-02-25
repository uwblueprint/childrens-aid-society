import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import { Case } from "../types/CasesContextTypes";

interface Visit {
    user_id: number;
    case_id: number;
    childDetails: {
        familyName: string;
        children: string[];
        childServiceWorker: string;
        childProtectionWorker: string;
        fosterCareCoordinator: string;
    };
    visitDetails: {
        visitDate: string;
        visitDay: string;
        visitSupervision: string;
        startTime: string;
        endTime: string;
        location: string;
    };
    attendanceEntries: {
        visitingMembers: string;
        visitorRelationship: string;
        description: string;
        visitingMemberName: string;
        visitAttendance: string;
        absenceReason: string;
    }[];
    transportationEntries: {
        gaurdian: string;
        name: string;
        duration: string;
    }[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const post = async (formData: any): Promise<Case> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.post("/visits", formData, {
      headers: { Authorization: bearerToken },
    });
    return data;
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
      `/visit/${intakeID}`,
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

export default { post, put };