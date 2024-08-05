export const INTRODUCER_DETAILS = "Introducer details";
export const TYPE_OF_LOAN = "Type of Loan";
export const TYPE_OF_APPLICANT = "Type of Applicant";
export const APPLICANT_DETAILS = "Applicant details";
export const SECURITY_DETAILS = "Security details";
export const LOAN_DETAILS = "Loan details";
export const FINANCIAL_DETAILS = "Financial details";
export const FINANCIAL_DETAILS_SUMMARY = "Financial details - Summary";
export const DIP_SUMMARY = "DIP Summary";

export const stepsWithNames = [
  { stepName: DIP_SUMMARY, stepIndex: 0 },
  { stepName: INTRODUCER_DETAILS, stepIndex: 1 },
  { stepName: TYPE_OF_LOAN, stepIndex: 2 },
  { stepName: TYPE_OF_APPLICANT, stepIndex: 3 },
  { stepName: APPLICANT_DETAILS, stepIndex: 4 },
  { stepName: SECURITY_DETAILS, stepIndex: 5 },
  { stepName: LOAN_DETAILS, stepIndex: 7 },
  { stepName: FINANCIAL_DETAILS, stepIndex: 8 },
  { stepName: FINANCIAL_DETAILS_SUMMARY, stepIndex: 10 },
];

export const namesOrder = stepsWithNames.map(({ stepName }) => stepName);
