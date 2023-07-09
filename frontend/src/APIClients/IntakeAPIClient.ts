import baseAPIClient from "./BaseAPIClient";
import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

export type IntakeResponse = {
  user_id: string | number;
  case_id: string | number;
  caseReferral: {
    referringWorkerName: string;
    referringWorkerContact: string;
    cpinFileNumber: number;
    cpinFileType: string;
    familyName: string;
    referralDate: string;
  };
  courtInformation: {
    courtStatus: string;
    orderReferral: number | null;
    firstNationHeritage: string;
    firstNationBand: string;
  };
  children: [
    {
      childInfo: {
        name: string;
        dateOfBirth: string;
        cpinFileNumber: number;
        serviceWorker: string;
        specialNeeds: string;
        concerns: string[];
      };
      daytimeContact: {
        name: string;
        contactInfo: string;
        address: string;
        dismissalTime: string;
      };
      provider: [
        {
          name: string;
          fileNumber: number;
          primaryPhoneNumber: number;
          secondaryPhoneNumber: number;
          email: string;
          address: string;
          additionalContactNotes: string;
          relationshipToChild: string;
        },
      ];
    },
  ];
  caregivers: [
    {
      name: string;
      dateOfBirth: string;
      primaryPhoneNumber: number;
      secondaryPhoneNumber: number;
      additionalContactNotes: string;
      address: string;
      relationshipToChild: string;
      individualConsiderations: string;
    },
  ];
  programDetails: {
    transportRequirements: string;
    schedulingRequirements: string;
    suggestedStartDate: string;
    shortTermGoals: string[];
    longTermGoals: string[];
    familialConcerns: string[];
    permittedIndividuals: [
      {
        name: string;
        phoneNumber: number;
        relationshipToChildren: string;
        additionalNotes: string;
      },
    ];
  };
};

interface Intake {
  user_id: number;
  id: number;
  referring_worker_name: string;
  referring_worker_contact: string;
  cpin_number: string;
  cpin_file_type: string;
  family_name: string;
  referral_date: string;
  court_status: string;
  first_nation_heritage: string;
  first_nation_band: string;
  transportation_requirements: string;
  scheduling_requirements: string;
  suggested_start_date: string;
}

const post = async ({
  formData,
}: {
  formData: FormData;
}): Promise<IntakeResponse> => {
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
): Promise<IntakeResponse[]> => {
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

    const mappedData: IntakeResponse[] = data.map((intake) => ({
      user_id: intake.user_id.toString(),
      case_id: intake.id.toString(),
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
        orderReferral: null,
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
