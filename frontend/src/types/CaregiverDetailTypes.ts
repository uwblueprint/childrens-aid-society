export type CaregiverDetails = {
  id?: number;
  intakeId: number;
  caregiverName: string;
  dateOfBirth: string;
  primaryPhoneNo: string;
  email: string;
  secondaryPhoneNo?: string;
  contactNotes?: string;
  address: string;
  relationship: string;
  indivConsiderations?: string;
};

export type Caregivers = CaregiverDetails[];
