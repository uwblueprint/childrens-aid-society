import { createContext } from "react";
import { CasesContextType } from "../types/CasesContextTypes";

export const DEFAULT_CASES_CONTEXT = [];

const CasesContext = createContext<CasesContextType>(DEFAULT_CASES_CONTEXT);

export default CasesContext;
