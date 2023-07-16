import {
  CasesContextActions,
  CasesContextType,
} from "../types/CasesContextTypes";

export default function casesContextReducer(
  state: CasesContextType,
  action: CasesContextActions,
): CasesContextType {
  switch (action) {
    default:
      return state;
  }
}
