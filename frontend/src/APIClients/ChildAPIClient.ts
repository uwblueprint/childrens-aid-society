import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import { Children } from "../components/intake/child-information/AddChildPage";

const post = async ({ formData }: { formData: FormData }): Promise<Children> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.post("/children", formData, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const get = async (
  intake_id: number,
): Promise<Children[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.get<Children[]>("/children", {
      headers: { Authorization: bearerToken },
      params: {
        intake_id
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

const put = async ({
  changedData,
  intake_id,
}: {
  changedData: Record<string, string>;
  intake_id: number;
}): Promise<Children> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.put(
      `/children/${intake_id}`,
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


export default { post,put, get };
