import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import CaseStatus from "../types/CaseStatus";
import { Case } from "../types/CasesContextTypes";
import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";
import baseAPIClient from "./BaseAPIClient";

interface Intake {
  user_id: number;
  case_id: number;
  intake_status: string;
  caseReferral: {
    referringWorker: string;
    referringWorkerContact: string;
    cpinFileNumber: string;
    cpinFileType: string;
    familyName: string;
    referralDate: string;
  };
  courtInformation: {
    courtStatus: string;
    orderReferral: File | null; 
    orderReferralId: number | null;
    orderReferralName: string | null;
    firstNationHeritage: string;
    firstNationBand: string;
  };
  programDetails: {
    transportationRequirements: string;
    schedulingRequirements: string;
    suggestedStartDate: string;
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const post = async (formData: any): Promise<Case> => {
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

const search = async (searchParam: string): Promise<Case[]> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;

  const url = "/intake/search";

  try {
    const { data } = await baseAPIClient.get<Intake[]>(url, {
      headers: { Authorization: bearerToken },
      params: {
        family_name: searchParam,
      },
    });

    const mappedDataCase: Case[] = data.map((intake) => ({
      user_id: intake.user_id.toString(),
      case_id: intake.case_id.toString(),
      intakeStatus: <CaseStatus>intake.intake_status,
      caseReferral: {
        referringWorkerName: intake.caseReferral.referringWorker,
        referringWorkerContact: intake.caseReferral.referringWorkerContact,
        cpinFileNumber: parseInt(intake.caseReferral.cpinFileNumber, 10),
        cpinFileType: intake.caseReferral.cpinFileType,
        familyName: intake.caseReferral.familyName,
        referralDate: new Date(
          intake.caseReferral.referralDate,
        ).toLocaleDateString("en-GB"),
      },
      courtInformation: {
        courtStatus: intake.courtInformation.courtStatus,
        orderReferral: intake.courtInformation.orderReferral, // changed from 0
        orderReferralId: intake.courtInformation.orderReferralId, // do we need this? 
        orderReferralName: intake.courtInformation.orderReferralName, // do we need this? 
        firstNationHeritage: intake.courtInformation.firstNationHeritage,
        firstNationBand: intake.courtInformation.firstNationBand,
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
        transportRequirements: intake.programDetails.transportationRequirements,
        schedulingRequirements: intake.programDetails.schedulingRequirements,
        suggestedStartDate: intake.programDetails.suggestedStartDate,
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

    return mappedDataCase;
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

  const url = "/intake";

  try {
    const { data } = await baseAPIClient.get<Intake[]>(url, {
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
      intakeStatus: <CaseStatus>intake.intake_status,
      caseReferral: {
        referringWorkerName: intake.caseReferral.referringWorker,
        referringWorkerContact: intake.caseReferral.referringWorkerContact,
        cpinFileNumber: parseInt(intake.caseReferral.cpinFileNumber, 10),
        cpinFileType: intake.caseReferral.cpinFileType,
        familyName: intake.caseReferral.familyName,
        referralDate: new Date(
          intake.caseReferral.referralDate,
        ).toLocaleDateString("en-GB"),
      },
      courtInformation: {
        courtStatus: intake.courtInformation.courtStatus,
        orderReferral: intake.courtInformation.orderReferral, // changed from 0
        orderReferralName: intake.courtInformation.orderReferralName || '',
        orderReferralId: intake.courtInformation.orderReferralId || 0,
        firstNationHeritage: intake.courtInformation.firstNationHeritage,
        firstNationBand: intake.courtInformation.firstNationBand,
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
        transportRequirements: intake.programDetails.transportationRequirements,
        schedulingRequirements: intake.programDetails.schedulingRequirements,
        suggestedStartDate: intake.programDetails.suggestedStartDate,
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

const getById = async (
  intake_id: number
): Promise<Case> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;

  const url = `/intake/${intake_id}`;

  try {
    const { data } = await baseAPIClient.get<Intake>(url, {
      headers: { Authorization: bearerToken },
      // params: {
      //   intake_id: intake_id
      // },
    });

    const intake = data;
    const mappedData: Case = ({
      user_id: intake.user_id.toString(),
      case_id: intake.case_id.toString(),
      intakeStatus: <CaseStatus>intake.intake_status,
      caseReferral: {
        referringWorkerName: intake.caseReferral.referringWorker,
        referringWorkerContact: intake.caseReferral.referringWorkerContact,
        cpinFileNumber: parseInt(intake.caseReferral.cpinFileNumber, 10),
        cpinFileType: intake.caseReferral.cpinFileType,
        familyName: intake.caseReferral.familyName,
        referralDate: new Date(
          intake.caseReferral.referralDate,
        ).toLocaleDateString("en-GB"),
      },
      courtInformation: {
        courtStatus: intake.courtInformation.courtStatus,
        orderReferral: intake.courtInformation.orderReferral, // changed from 0
        orderReferralName: intake.courtInformation.orderReferralName || '',
        orderReferralId: intake.courtInformation.orderReferralId || 0,
        firstNationHeritage: intake.courtInformation.firstNationHeritage,
        firstNationBand: intake.courtInformation.firstNationBand,
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
        transportRequirements: intake.programDetails.transportationRequirements,
        schedulingRequirements: intake.programDetails.schedulingRequirements,
        suggestedStartDate: intake.programDetails.suggestedStartDate,
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
    });

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const downloadFile = async (fileId: number): Promise<any> => {
// const downloadFile = async (fileId: number): Promise<Response> => {
// const downloadFile = async (fileId: number, fileName: string): Promise<any> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "access_token",
  )}`;
  try {
    // Attempt 1
    // const { data } = await baseAPIClient.get(`/intake/download/${fileId}`, {
    //   headers: { Authorization: bearerToken },
    // });
    // console.log('returned data from intakeapiclients', data);
    // return data;
    // Attempt 2: Can't use blobs 
    // const response = await baseAPIClient.get(`/intake/download/${fileId}`, {
    //   headers: { Authorization: bearerToken },
    // });
    // console.log('returned data from intakeapiclients', response);
    // const blob = response.blob();
    // console.log('blob');
    // // const blobURL = window.URL.createObjectURL(blob);
    // return blob;
    // Attempt 3
    const response = await baseAPIClient.get(`/intake/download/${fileId}`, {
      headers: { Authorization: bearerToken },
    });
    console.log('returned data from intakeapiclients', response);
    console.log('our data', response.data);

    // const contentDisposition = response.headers['content-disposition'];
    // console.log('content-disposition', contentDisposition);
    // let filename = 'downloaded_file';
    // if (contentDisposition) {
    //     const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    //     const matches = filenameRegex.exec(contentDisposition);
    //     if (matches != null && matches[1]) {
    //         filename = matches[1].replace(/['"]/g, '');
    //     }
    // }
    // return response; 

    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.ext'; // Set desired file name
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    return url;

    // const contentDisposition = response.headers['content-disposition'];
    // const filename = contentDisposition.split('filename=')[1].trim();

    // // Create a Blob object from the file data
    // const blob = new Blob([response.data], { type: response.headers['content-type'] });

    // // const blob = response.blob();
    // console.log('blob');
    // // const blobURL = window.URL.createObjectURL(blob);
    // return {blob, filename};
  } catch (error) {
    return error;
  }
};

export default { post, get, getById, put, deleteIntake, search, downloadFile  };
