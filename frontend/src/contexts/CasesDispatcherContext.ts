import { createContext } from "react";
import { CasesContextActions } from "../types/CasesContextTypes";

const CasesDispatcherContext = createContext<
  React.Dispatch<CasesContextActions>
>(() => {});

export default CasesDispatcherContext;
