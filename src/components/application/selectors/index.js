import * as _ from "lodash";

import getApplication from "./getApplication";

export { default as getApplication } from "./getApplication";
export { default as getApplicationStepsData } from "./getApplicationStepsData";

const getIntroducerDetails = (application) => application?.introducer_details;
const getIndividualsDetails = (application) => application?.individuals || [];
const getCompaniesDetails = (application) => application?.companyData;
const getPropertiesDetails = (application) => application?.properties;
const getSolicitorDetails = (application) => application?.solicitor_details;
const getAdditionalInformation = (application) =>
  application?.additional_information;

const getInitialNetDetails = (application) => application?.initial_net_loan;
const getLoanTerm = (application) => application?.loan_term;
const getLoanType = (application) => application?.type_of_loan;

const getPurposeOfBorrowings = (application) =>
  application?.purpose_of_borrowings;
const getSourceOfDeposit = (application) => application?.source_of_deposit;
const getFurtherDetails = (application) => application?.further_details;
const getRepaymentMethodDetails = (application) =>
  application?.repayment_method_details;

const getRepaymentMethod = (application) => application?.repayment_method;
const getProposedCompletionDate = (application) =>
  application?.proposed_completion_date;

export const getPurposeOfBorrowingsOfApplication = _.flow([
  getApplication,
  getPurposeOfBorrowings,
]);
export const getSourceOfDepositOfApplication = _.flow([
  getApplication,
  getSourceOfDeposit,
]);
export const getFurtherDetailsOfApplication = _.flow([
  getApplication,
  getFurtherDetails,
]);
export const getRepaymentMethodOfApplication = _.flow([
  getApplication,
  getRepaymentMethod,
]);
export const getRepaymentMethodDetailsOfApplication = _.flow([
  getApplication,
  getRepaymentMethodDetails,
]);
export const getProposedCompletionDateOfApplication = _.flow([
  getApplication,
  getProposedCompletionDate,
]);
export const getInitialNetDetailsOfApplication = _.flow([
  getApplication,
  getInitialNetDetails,
]);
export const getLoanTermOfApplication = _.flow([getApplication, getLoanTerm]);
export const getLoanTypeOfApplication = _.flow([getApplication, getLoanType]);
export const getIntroducerDetailsOfApplication = _.flow([
  getApplication,
  getIntroducerDetails,
]);

export const getIndividualsOfApplication = _.flow([
  getApplication,
  getIndividualsDetails,
]);
export const getCompaniesOfApplication = _.flow([
  getApplication,
  getCompaniesDetails,
]);

export const getPropertiesOfApplication = _.flow([
  getApplication,
  getPropertiesDetails,
]);
export const getSolicitorDetailsOfApplication = _.flow([
  getApplication,
  getSolicitorDetails,
]);
export const getAdditionalInformationOfApplication = _.flow([
  getApplication,
  getAdditionalInformation,
]);
