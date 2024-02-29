import { CourtDetails } from "../components/intake/CourtInformationForm";
import { ProgramDetails } from "../components/intake/ProgramForm";
import { ReferralDetails } from "../components/intake/ReferralForm";

export const DEFAULT_REFFERAL_DETAILS: ReferralDetails = {
  referringWorker: "",
  referringWorkerContact: "",
  familyName: "",
  referralDate: "",
  cpinFileNumber: "",
  cpinFileType: "",
  phoneNumber: "",
};

export const DEFAULT_COURT_DETAILS: CourtDetails = {
  currentCourtStatus: "",
  firstNationHeritage: "",
  firstNationBand: "",
  orderReferral: null, // type is file!
  orderReferralId: null,
  orderReferralName: "",
};

export const DEFAULT_PROGRAM_DETAILS: ProgramDetails = {
  transportationRequirements: "",
  schedulingRequirements: "",
  suggestedStartDate: "",
  shortTermGoals: [],
  longTermGoals: [],
  familialConcerns: [],
};
