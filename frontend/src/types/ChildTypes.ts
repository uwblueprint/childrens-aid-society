import { Providers } from "../components/intake/NewProviderModal";
import { ChildDetails } from "../components/intake/child-information/ChildInformationForm";
import{ SchoolDetails } from "../components/intake/child-information/SchoolDaycareForm";

export type ChildrenDetails = {
    childDetails: ChildDetails;
    schoolDetails: SchoolDetails;
    providers: Providers;
  };

export type Children = ChildrenDetails[];
  