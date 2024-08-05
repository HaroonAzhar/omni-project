import { createSelector } from "reselect";

export const getCompleted = (state) => state.completed || {};

export const getDateOfCompletion = createSelector(
  [getCompleted],
  (completed) => completed.DateOfCompletion
);

export const getOriginalDateOfMaturity = createSelector(
  [getCompleted],
  (completed) => completed.DateOfMaturity
);

export const getExtendedDateOfMaturity = createSelector(
  [getCompleted],
  (completed) =>
    completed.DateOfMaturity === completed.currentDateOfMaturity
      ? undefined
      : completed.currentDateOfMaturity
);

export const getInterestRate = createSelector(
  [getCompleted],
  (completed) => completed.currentInterestRate
);

export const getLoanStatus = createSelector(
  [getCompleted],
  (completed) => completed.status
);

export const getAutomaticLoanStatus = createSelector(
  [getCompleted],
  (completed) => completed.automaticStatus
);

export const getLastManualStatus = createSelector(
  [getCompleted],
  (completed) => completed.lastStatus
);

export const getDip = (state) => state.dip || {};

export const getInitialNetLoanAmount = createSelector(
  [getDip],
  (dip) => dip.InitialNetLoanAmount
);

export const getTotalFacility = createSelector(
  [getDip],
  (dip) => dip.TotalLoanFacility
);

export const getSecurities = createSelector(
  [getDip],
  (dip) => dip.securities || []
);

export const getContacts = createSelector(
  [getDip],
  (dip) => dip.contacts || []
);

export const getApplication = (state) => state.application || {};

export const getIndividuals = createSelector(
  [getApplication],
  (application) => application.individuals || []
);

export const getCompanies = createSelector(
  [getApplication],
  (application) => application.companies || []
);

const getUser = (state) => state.case?.assignedUser || {};
export const getAssignedUser = createSelector([getUser], (user) => user.Name);

export const getCrossCollateralisedLoans = (state) =>
  state.case?.crossCollateralisedLoans || [];
