import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { Children, ChildrenDetails } from "../types/ChildTypes";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

const post = async ({
  newChild,
  intakeId,
}: {
  newChild: ChildrenDetails;
  intakeId: number;
}): Promise<Children> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.post(
      `/children/${intakeId}`,
      newChild,
      {
        headers: { Authorization: bearerToken },
      },
    );
    return data;
  } catch (error) {
    return error;
  }
};

const get = async (intakeId: number): Promise<Children> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.get<Children>("/children", {
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

const put = async ({
  updatedChild,
  intakeId,
}: {
  updatedChild: ChildrenDetails;
  intakeId: number;
}): Promise<Children> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.put(
      `/children/${intakeId}`,
      updatedChild,
      {
        headers: { Authorization: bearerToken },
      },
    );
    return data;
  } catch (error) {
    return error;
  }
};

export default { post, put, get };
