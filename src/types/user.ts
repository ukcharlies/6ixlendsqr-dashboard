export type Guarantor = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
};

export type User = {
  id: number;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  educationLevel: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: number;
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantors: Guarantor[];
};
