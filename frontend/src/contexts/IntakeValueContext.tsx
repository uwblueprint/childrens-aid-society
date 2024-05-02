import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CaseStatus from "../types/CaseStatus";
import { PermittedIndividualsDetails } from "../components/intake/PermittedIndividualsModal";

export interface ReferralDetails {
  referringWorker: string;
  referringWorkerContact: string;
  cpinFileNumber: string;
  cpinFileType: string;
  familyName: string;
  referralDate: string;
}

interface CourtDetails {
  courtStatus: string;
  orderReferral: File | null;
  firstNationHeritage: string;
  firstNationBand: string;
}

interface ProgramDetails {
  transportationRequirements: string;
  schedulingRequirements: string;
  suggestedStartDate: string;
  shortTermGoals: string[];
  longTermGoals: string[];
  familialConcerns: string[];
  permittedIndividuals: PermittedIndividualsDetails[];
}

const DEFAULT_REFFERAL_DETAILS: ReferralDetails = {
  referringWorker: "",
  referringWorkerContact: "",
  familyName: "",
  referralDate: "",
  cpinFileNumber: "",
  cpinFileType: "",
};

const DEFAULT_COURT_DETAILS: CourtDetails = {
  courtStatus: "",
  firstNationHeritage: "",
  firstNationBand: "",
  orderReferral: null,
};

const DEFAULT_PROGRAM_DETAILS: ProgramDetails = {
  transportationRequirements: "",
  schedulingRequirements: "",
  suggestedStartDate: "",
  shortTermGoals: [],
  longTermGoals: [],
  familialConcerns: [],
  permittedIndividuals: [
    {
      providerName: "",
      phoneNo: "",
      relationshipToChild: "",
      additionalNotes: "",
    },
  ],
};

const DEFAULT_STATUS: string = CaseStatus.ACTIVE;

interface IntakeValueProviderProps {
  children: React.ReactNode;
}

export interface IntakeStepContext {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  isReviewOnly: boolean;
  setIsReviewOnly: React.Dispatch<React.SetStateAction<boolean>>;
  referralDetails: ReferralDetails;
  setReferralDetails: React.Dispatch<React.SetStateAction<ReferralDetails>>;
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  intakeStatus: string;
  setIntakeStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const StepValueContext = createContext<IntakeStepContext>({
  step: 0,
  setStep: () => {},
  id: "",
  setId: () => {},
  isReviewOnly: false,
  setIsReviewOnly: () => {},
  referralDetails: DEFAULT_REFFERAL_DETAILS,
  setReferralDetails: () => {},
  courtDetails: DEFAULT_COURT_DETAILS,
  setCourtDetails: () => {},
  programDetails: DEFAULT_PROGRAM_DETAILS,
  setProgramDetails: () => {},
  intakeStatus: DEFAULT_STATUS,
  setIntakeStatus: () => {},
});

export function useStepValueContext(): IntakeStepContext {
  return useContext(StepValueContext);
}

export const IntakeValueProvider: React.FC<IntakeValueProviderProps> = ({
  children,
}: IntakeValueProviderProps) => {
  const location = useLocation();

  const [isReviewOnly, setIsReviewOnly] = useState<boolean>(false);
  const [referralDetails, setReferralDetails] = useState<ReferralDetails>(
    DEFAULT_REFFERAL_DETAILS,
  );
  const [courtDetails, setCourtDetails] = useState<CourtDetails>(
    DEFAULT_COURT_DETAILS,
  );
  const [programDetails, setProgramDetails] = useState<ProgramDetails>(
    DEFAULT_PROGRAM_DETAILS,
  );

  const [intakeStatus, setIntakeStatus] = useState<string>(DEFAULT_STATUS);
  const [step, setStep] = useState(0);
  const [id, setId] = useState("");
  const reviewCaseDetailsStep = 4;

  useEffect(() => {
    if (step !== reviewCaseDetailsStep) {
      setStep(0);
      setId("");
      setIsReviewOnly(false);
      setReferralDetails(DEFAULT_REFFERAL_DETAILS);
      setCourtDetails(DEFAULT_COURT_DETAILS);
      setProgramDetails(DEFAULT_PROGRAM_DETAILS);
      setIntakeStatus(DEFAULT_STATUS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const intakeValues = {
    step,
    setStep,
    id,
    setId,
    isReviewOnly,
    setIsReviewOnly,
    referralDetails,
    setReferralDetails,
    courtDetails,
    setCourtDetails,
    programDetails,
    setProgramDetails,
    intakeStatus,
    setIntakeStatus,
  };

  return (
    <StepValueContext.Provider value={intakeValues}>
      {children}
    </StepValueContext.Provider>
  );
};
