import * as _ from "lodash";

import { getApplication } from "../../../selectors";

const getLoanDetails = (application) => application?.loanDetails || {};

const getLoanDetailsOfApplication = _.flow([getApplication, getLoanDetails]);
const getInitialNetDetails = (loanDetails) => loanDetails?.InitialNetLoanAmount;
const getPurposeOfBorrowings = (loanDetails) => loanDetails?.PurposeOfBorrowing;
const getSourceOfDeposit = (loanDetails) => loanDetails?.SourceOfDeposit;
const getFurtherDetails = (loanDetails) => loanDetails?.FurtherDetails;
const getRepaymentMethodDetails = (loanDetails) =>
  loanDetails?.RepaymentMethodDetails ?? "";
const getRepaymentMethod = (loanDetails) => loanDetails?.RepaymentMethod;
const getProposedCompletionDate = (loanDetails) =>
  loanDetails?.ProposedCompletionDate ?? "";
const getTypeOfApplicant = (loanDetails) => loanDetails?.ContactType ?? "";

export const getInitialNetDetailsOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getInitialNetDetails,
]);

export const getPurposeOfBorrowingsOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getPurposeOfBorrowings,
]);

export const getSourceOfDepositOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getSourceOfDeposit,
]);

export const getFurtherDetailsOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getFurtherDetails,
]);

export const getRepaymentMethodDetailsOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getRepaymentMethodDetails,
]);

export const getRepaymentMethodOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getRepaymentMethod,
]);

export const getProposedCompletionDateOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getProposedCompletionDate,
]);

export const getTypeOfApplicantOfLoanDetails = _.flow([
  getLoanDetailsOfApplication,
  getTypeOfApplicant,
]);
