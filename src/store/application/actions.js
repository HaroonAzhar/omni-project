export * from "./case_summary_actions";

export const SAVE_APPLICATION_DATA = "SAVE_APPLICATION_DATA";
export const REMOVE_APPLICATION_DATA = "REMOVE_APPLICATION_DATA";
export const SAVE_COMPANY_DATA = "SAVE_COMPANY_DATA";
export const SAVE_LOAN_DATA = "SAVE_LOAN_DATA";
export const SAVE_INTRODUCER_DATA = "SAVE_INTRODUCER_DATA";
export const SAVE_SOLICITORS_DATA = "SAVE_SOLICITORS_DATA";
export const SAVE_ADDITIONAL_DATA = "SAVE_ADDITIONAL_DATA";
export const SAVE_VALUATION_REPORT = "SAVE_VALUATION_REPORT";
export const SAVE_VALUATION_OVERVIEW = "SAVE_VALUATION_OVERVIEW";
export const SAVE_LOAN_SUMMARY = "SAVE_LOAN_SUMMARY";
export const ADD_ASSET = "ADD_ASSET_LIABILITY";
export const REMOVE_ASSET = "REMOVE_ASSET";
export const SAVE_APPLICANT = "SAVE_APPLICANT";
export const SAVE_ALL_APPLICANTS = "SAVE_ALL_APPLICANTS";
export const SAVE_PROPERTY = "SAVE_PROPERTY";
export const SAVE_AML_KYC_VALIDATION = "SAVE_AML_KYC_VALIDATION";

export const saveApplicationData = (applicationData) => ({
  type: SAVE_APPLICATION_DATA,
  applicationData,
});

export const saveApplicantState = (indexOfElement, applicantData) => ({
  type: SAVE_APPLICANT,
  indexOfElement,
  applicantData,
});

export const saveAllApplicantsState = (applicantsData) => ({
  type: SAVE_ALL_APPLICANTS,
  applicantsData,
});

export const savePropertyStore = (indexOfProperty, propertyData) => ({
  type: SAVE_PROPERTY,
  indexOfProperty,
  propertyData,
});

export const saveCompanyData = (companyData) => ({
  type: SAVE_COMPANY_DATA,
  companyData,
});

export const saveLoanData = (application_loan_details) => ({
  type: SAVE_LOAN_DATA,
  application_loan_details,
});

export const saveIntroducerData = (introducer_details) => ({
  type: SAVE_INTRODUCER_DATA,
  introducer_details,
});

export const saveSolicitorsData = (solicitor_details) => ({
  type: SAVE_SOLICITORS_DATA,
  solicitor_details,
});

export const saveAdditionalData = (additional_information) => ({
  type: SAVE_ADDITIONAL_DATA,
  additional_information,
});

export const saveAmlKycValidation = (aml_kyc_validation) => ({
  type: SAVE_AML_KYC_VALIDATION,
  aml_kyc_validation,
});

export const saveValuationReport = (valuation_report, indexOfProperty) => ({
  type: SAVE_VALUATION_REPORT,
  valuation_report,
  indexOfProperty,
});

export const saveValuationOverviewState = (data) => ({
  type: SAVE_VALUATION_OVERVIEW,
  data,
});

export const saveLoanSummaryState = (data) => ({
  type: SAVE_LOAN_SUMMARY,
  data,
});

export const removeApplicationData = () => ({
  type: REMOVE_APPLICATION_DATA,
});

export const addApplicantAsset = (indexOfElement) => ({
  type: ADD_ASSET,
  indexOfElement,
});

export const removeApplicantAssetOrLiability = (
  indexOfElement,
  indexOfAsset
) => ({
  type: REMOVE_ASSET,
  indexOfElement,
  indexOfAsset,
});
