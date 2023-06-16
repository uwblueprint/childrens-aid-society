import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface IntakeValueProviderProps {
  children: React.ReactNode;
}

interface IntakeStepContext {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepValueContext = createContext<IntakeStepContext>({
  step: 0,
  setStep: () => {},
});

export function useStepValueContext() {
  return useContext(StepValueContext);
}

export const IntakeValueProvider = ({ children }: IntakeValueProviderProps) => {
  const location = useLocation();
  const [step, setStep] = useState(0);
  const reviewCaseDetailsStep = 4;

  useEffect(() => {
    if (step !== reviewCaseDetailsStep) {
      setStep(0);
    }
  }, [location]);

  return (
    <StepValueContext.Provider value={{ step, setStep }}>
      {children}
    </StepValueContext.Provider>
  );
};
