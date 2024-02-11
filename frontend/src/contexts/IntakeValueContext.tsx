import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CourtDetails } from "../components/intake/CourtInformationForm";
import { ProgramDetails } from "../components/intake/ProgramForm";
import { ReferralDetails } from "../components/intake/ReferralForm";
import {
  DEFAULT_COURT_DETAILS,
  DEFAULT_PROGRAM_DETAILS,
  DEFAULT_REFFERAL_DETAILS,
} from "../constants/DefaultIntakeValues";

interface IntakeValueProviderProps {
  children: React.ReactNode;
}

interface IntakeStepContext {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isReviewOnly: boolean;
  setIsReviewOnly: React.Dispatch<React.SetStateAction<boolean>>;
  referralDetails: ReferralDetails;
  setReferralDetails: React.Dispatch<React.SetStateAction<ReferralDetails>>;
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
}

const StepValueContext = createContext<IntakeStepContext>({
  step: 0,
  setStep: () => {},
  isReviewOnly: false,
  setIsReviewOnly: () => {},
  referralDetails: DEFAULT_REFFERAL_DETAILS,
  setReferralDetails: () => {},
  courtDetails: DEFAULT_COURT_DETAILS,
  setCourtDetails: () => {},
  programDetails: DEFAULT_PROGRAM_DETAILS,
  setProgramDetails: () => {},
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
  // set court details is defined here 
  const [courtDetails, setCourtDetails] = useState<CourtDetails>(
    DEFAULT_COURT_DETAILS,
  );
  const [programDetails, setProgramDetails] = useState<ProgramDetails>(
    DEFAULT_PROGRAM_DETAILS,
  );
  const [step, setStep] = useState(0);
  const reviewCaseDetailsStep = 4;

  useEffect(() => {
    if (step !== reviewCaseDetailsStep) {
      setStep(0);
      setIsReviewOnly(false);
      setReferralDetails(DEFAULT_REFFERAL_DETAILS);
      setCourtDetails(DEFAULT_COURT_DETAILS);
      setProgramDetails(DEFAULT_PROGRAM_DETAILS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const intakeValues = {
    step,
    setStep,
    isReviewOnly,
    setIsReviewOnly,
    referralDetails,
    setReferralDetails,
    courtDetails,
    setCourtDetails,
    programDetails,
    setProgramDetails,
  };

  return (
    <StepValueContext.Provider value={intakeValues}>
      {children}
    </StepValueContext.Provider>
  );
};
