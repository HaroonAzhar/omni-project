export const SAVE_TITLE_NUMBERS = "SAVE_TITLE_NUMBERS";
export const SAVE_CASE_OVERVIEW = "SAVE_CASE_OVERVIEW";
export const SAVE_FURTHER_COMMENTS = "SAVE_FURTHER_COMMENTS";
export const SAVE_RISK_AND_MITIGATION = "SAVE_RISK_AND_MITIGATION";
export const SAVE_SECURITY_OVERVIEW = "SAVE_SECURITY_OVERVIEW";
export const UPDATE_RISK_INPUT = "UPDATE_RISK_INPUT";
export const SAVE_BORROWER_PROFILE = "SAVE_BORROWER_PROFILE";

export const saveTitleNumbers = (title_numbers, indexOfProperty) => ({
  type: SAVE_TITLE_NUMBERS,
  title_numbers,
  indexOfProperty,
});

export const saveFurtherCommentsState = (data) => ({
  type: SAVE_FURTHER_COMMENTS,
  data,
});

export const saveRiskAndMitigationState = (data) => ({
  type: SAVE_RISK_AND_MITIGATION,
  data,
});

export const updateRiskAndMitigationState = (data) => ({
  type: UPDATE_RISK_INPUT,
  data,
});

export const saveCaseOverviewState = (data) => ({
  type: SAVE_CASE_OVERVIEW,
  data,
});

export const saveSecurityOverviewState = (data) => ({
  type: SAVE_SECURITY_OVERVIEW,
  data,
});

export const saveBorrowerProfileState = (data) => ({
  type: SAVE_BORROWER_PROFILE,
  data,
});
