import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import { Caregivers } from "../types/CaregiverDetailTypes";

interface Caregiver {
  address: string;
  date_of_birth: string;
  email: string;
  id: number;
  intake_id: number;
  name: string;
  primary_phone_number: string;
  relationship_to_child: string;
  additional_contact_notes?: string;
  individual_considerations?: string;
  secondary_phone_number?: string;
}

const post = async (
  intakeId: number,
  caregiverName: string,
  caregiverEmail: string,
  dateOfBirth: string,
  primaryPhoneNo: string,
  relationship: string,
  caregiverAddress: string,
  secondaryPhoneNo?: string,
  indivConsiderations?: string,
  contactNotes?: string,
): Promise<Caregiver> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    let caregiverData = {
      intake_id: intakeId,
      name: caregiverName,
      email: caregiverEmail,
      date_of_birth: dateOfBirth,
      primary_phone_number: primaryPhoneNo,
      relationship_to_child: relationship,
      address: caregiverAddress,
    };
    if (indivConsiderations) {
      const updatedData = {
        ...caregiverData,
        individual_considerations: indivConsiderations,
      };
      caregiverData = updatedData;
    }
    if (secondaryPhoneNo) {
      const updatedData = {
        ...caregiverData,
        secondary_phone_number: secondaryPhoneNo,
      };
      caregiverData = updatedData;
    }
    if (contactNotes) {
      const updatedData = {
        ...caregiverData,
        additional_contact_notes: contactNotes,
      };
      caregiverData = updatedData;
    }
    const { data } = await baseAPIClient.post("/caregiver", caregiverData, {
      headers: { Authorization: bearerToken },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const getById = async (intake_id: number): Promise<Caregivers> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const { data } = await baseAPIClient.get<Caregiver[]>(
      `/caregiver/${intake_id}`,
      {
        headers: { Authorization: bearerToken },
        params: {
          intake_id,
        },
      },
    );

    const mappedData: Caregivers = data.map((caregiver) => ({
      intakeId: caregiver.intake_id,
      caregiverName: caregiver.name,
      dateOfBirth: caregiver.date_of_birth,
      primaryPhoneNo: caregiver.primary_phone_number,
      email: caregiver.email,
      secondaryPhoneNo: caregiver.secondary_phone_number
        ? caregiver.secondary_phone_number
        : undefined,
      contactNotes: caregiver.additional_contact_notes
        ? caregiver.additional_contact_notes
        : "",
      address: caregiver.address,
      relationship: caregiver.relationship_to_child,
      indivConsiderations: caregiver.individual_considerations
        ? caregiver.individual_considerations
        : "",
      id: caregiver.id,
    }));

    return mappedData;
  } catch (error) {
    return error;
  }
};

const put = async (
  caregiverId: number,
  intakeId: number,
  caregiverName?: string,
  caregiverEmail?: string,
  dateOfBirth?: string,
  primaryPhoneNo?: string,
  relationship?: string,
  caregiverAddress?: string,
  secondaryPhoneNo?: string,
  indivConsiderations?: string,
  contactNotes?: string,
): Promise<Caregiver> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    let caregiverData = {
      id: caregiverId,
      intake_id: intakeId,
      name: caregiverName,
      email: caregiverEmail,
      date_of_birth: dateOfBirth,
      primary_phone_number: primaryPhoneNo,
      relationship_to_child: relationship,
      address: caregiverAddress,
    };
    if (indivConsiderations) {
      const updatedData = {
        ...caregiverData,
        individual_considerations: indivConsiderations,
      };
      caregiverData = updatedData;
    }
    if (secondaryPhoneNo) {
      const updatedData = {
        ...caregiverData,
        secondary_phone_number: secondaryPhoneNo,
      };
      caregiverData = updatedData;
    }
    if (contactNotes) {
      const updatedData = {
        ...caregiverData,
        additional_contact_notes: contactNotes,
      };
      caregiverData = updatedData;
    }
    const { data } = await baseAPIClient.put(
      `/caregiver/${caregiverId}`,
      caregiverData,
      {
        headers: { Authorization: bearerToken },
      },
    );
    return data;
  } catch (error) {
    return error;
  }
};

const deleteCaregiver = async (caregiverId: number): Promise<void> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    const response = await baseAPIClient.delete(
      `/caregiver/?caregiver_id=${caregiverId}`,
      {
        headers: { Authorization: bearerToken },
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export default { post, getById, put, deleteCaregiver };
