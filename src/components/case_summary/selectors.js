import * as _ from "lodash";
import moment from "moment";

const getApplication = (state) => state.application ?? {};

const getSummary = (application) => application?.summary ?? {};

const getSummaryOfApplication = _.flow([getApplication, getSummary]);

const getSecurity = (summary) => summary?.security ?? {};

const getSecurityOfSummary = _.flow([getSummaryOfApplication, getSecurity]);

const getDescriptionOfProperty = (security) =>
  security?.description_of_property;

export const getDescriptionOfPropertyFromSecurity = _.flow([
  getSecurityOfSummary,
  getDescriptionOfProperty,
]);

const getDescriptionOfWorks = (security) => security?.description_of_works;

export const getDescriptionOfWorksFromSecurity = _.flow([
  getSecurityOfSummary,
  getDescriptionOfWorks,
]);

const getValuerName = (security) => security?.valuer_name;

export const getValuerNameFromSecurity = _.flow([
  getSecurityOfSummary,
  getValuerName,
]);

const getAnalysisOfProperty = (security) => security?.analysis_of_property;

export const getAnalysisOfPropertyFromSecurity = _.flow([
  getSecurityOfSummary,
  getAnalysisOfProperty,
]);

const getOverview = (summary) => summary?.overview ?? {};

const getOverviewOfSummary = _.flow([getSummaryOfApplication, getOverview]);

const getUnderwriterId = (overview) => overview?.underwriter;

export const getUnderwriterIdOfOverview = _.flow([
  getOverviewOfSummary,
  getUnderwriterId,
]);

const getExecutiveSummary = (overview) => overview?.executive_summary;

export const getExecutiveSummaryOfOverview = _.flow([
  getOverviewOfSummary,
  getExecutiveSummary,
]);

const getStartCaseSummaryDate = (overview) =>
  overview?.start_case_summary_date ?? "";

export const getStartCaseSummaryDateOfOverview = _.flow([
  getOverviewOfSummary,
  getStartCaseSummaryDate,
]);

const getExpectedCompletionDate = (overview) =>
  moment(overview?.expected_completion_date ?? "").format(
    moment.HTML5_FMT.DATE
  );

export const getExpectedCompletionDateOfOverview = _.flow([
  getOverviewOfSummary,
  getExpectedCompletionDate,
]);

const getRiskAndMitigation = (summary) => summary?.risk_mitigations ?? {};

const getRiskAndMitigationOfSummary = _.flow([
  getSummaryOfApplication,
  getRiskAndMitigation,
]);

const getRiskInputs = (riskMitigation) => riskMitigation?.risk_inputs || [];

export const getRiskInputsOfRiskAndMitigation = _.flow([
  getRiskAndMitigationOfSummary,
  getRiskInputs,
]);

const getUnderwriterRationale = (riskMitigation) =>
  riskMitigation?.underwriter_rationale;

export const getUnderwriterRationaleOfRiskAndMitigation = _.flow([
  getRiskAndMitigationOfSummary,
  getUnderwriterRationale,
]);

const getFurtherComments = (summary) => summary?.further_comments ?? {};

const getFurtherCommentsOfSummary = _.flow([
  getSummaryOfApplication,
  getFurtherComments,
]);

const getExitStrategy = (further_comments) => further_comments?.exit_strategy;

export const getExitStrategyOfFurtherComments = _.flow([
  getFurtherCommentsOfSummary,
  getExitStrategy,
]);

const getOngoingMonitoring = (further_comments) =>
  further_comments?.ongoing_monitoring;

export const getOngoingMonitoringOfFurtherComments = _.flow([
  getFurtherCommentsOfSummary,
  getOngoingMonitoring,
]);

const getSpecialConditions = (further_comments) =>
  further_comments?.special_conditions;

export const getSpecialConditionsOfFurtherComments = _.flow([
  getFurtherCommentsOfSummary,
  getSpecialConditions,
]);

const getBorrower = (summary) => summary?.borrower ?? {};

const getBorrowerOfSummary = _.flow([getSummaryOfApplication, getBorrower]);

const getBorrowerProfile = (borrower) => borrower?.borrower_profile;

export const getBorrowerProfileOfBorrower = _.flow([
  getBorrowerOfSummary,
  getBorrowerProfile,
]);

const getClientMeetingAttendees = (borrower) =>
  borrower?.client_meeting_attendees;

export const getClientMeetingAttendeesOfBorrower = _.flow([
  getBorrowerOfSummary,
  getClientMeetingAttendees,
]);

const getClientMeetingDate = (borrower) => borrower?.client_meeting_date;

export const getClientMeetingDateOfBorrower = _.flow([
  getBorrowerOfSummary,
  getClientMeetingDate,
]);

const getClientMeetingNotes = (borrower) => borrower?.client_meeting_notes;

export const getClientMeetingNotesOfBorrower = _.flow([
  getBorrowerOfSummary,
  getClientMeetingNotes,
]);

const getProperties = (application) => application?.properties ?? [];

export const getPropertiesOfApplication = _.flow([
  getApplication,
  getProperties,
]);
