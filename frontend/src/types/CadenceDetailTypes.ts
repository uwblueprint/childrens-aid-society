export type CadenceDetails = {
  intake_id: number;
  date: string;
  time: string;
  frequency: string;
  family_member?: string;
  notes?: string;
  id?: number;
  child_id?: number;
  caregiver_id?: number;
};

export type Cadences = CadenceDetails[];
