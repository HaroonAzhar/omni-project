import { ENVIRONMENT, ENVIRONMENTS, IS_PRODUCTION } from "./env";

export const COMPANIES_HOUSE_URL = "https://api.companieshouse.gov.uk";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const defaultApiUrl =
  process.env.REACT_APP_USE_LOCAL_API === "true"
    ? `http://localhost:${process.env.REACT_APP_LOCAL_API_PORT}/`
    : {
        [ENVIRONMENTS.DEV]: "http://localhost:3004/",
        [ENVIRONMENTS.STAGE]: "https://uat-omni-api.herokuapp.com/",
        [ENVIRONMENTS.TEST]: "https://uat-omni-api.herokuapp.com/",
        [ENVIRONMENTS.PROD]: `https://${window.location.hostname}:5010/`,
      }[ENVIRONMENT];
export const BACKEND_URL = apiUrl || defaultApiUrl;

const calculatorUrl = process.env.REACT_APP_CALC_BASE_URL;
const defaultCalculatorUrl = IS_PRODUCTION
  ? `https://${window.location.hostname}:5013/`
  : "https://uat-omni-calculator.herokuapp.com/";
export const CALCULATOR_URL = calculatorUrl || defaultCalculatorUrl;

const pipelineUrl = process.env.REACT_APP_PIPELINE_BASE_URL;

export const PIPELINE_URL = pipelineUrl;

export const CASES = (CaseNr = "") =>
  `${BACKEND_URL}cases${CaseNr !== "" ? `?CaseNr=${CaseNr}` : ""}`;
export const USER = () => `${BACKEND_URL}user`;
export const SELECTED_CASE = (id) => `${CASES()}/${id}`;
export const DIP_OF_CASE = (id) => `${CASES()}/${id}/dip`;
export const ENQUIRY_OF_CASE = (id) => `${CASES()}/${id}/enquiry`;
export const APPLICATION_OF_CASE = (id) => `${CASES()}/${id}/application`;
export const APPLICANT_OF_CASE = (id) => `${CASES()}/${id}/applicant`;
export const LOAN_OF_CASE = (id) => `${CASES()}/${id}/loan_details`;
export const INTRODUCER_OF_CASE = (id) => `${CASES()}/${id}/introducer_details`;
export const SOLICITORS_OF_CASE = (id) => `${CASES()}/${id}/solicitors_details`;
export const ADDITIONAL_INFORMATION_OF_CASE = (id) =>
  `${CASES()}/${id}/additional_information`;
export const DECLARATION_AND_SIGNATURE_OF_CASE = (id) =>
  `${CASES()}/${id}/declaration_and_signature`;

export const AML_KYC_VALIDATION = (id) => `${CASES()}/${id}/aml_kyc_validation`;
export const PROPERTY_OF_CASE = (id) => `${CASES()}/${id}/property`;
export const REF_OF_CASE = (id) => `${CASES()}/${id}/caseNr`;
export const PROPERTY_VALUATION_OF_CASE = (id, propertyId) =>
  `${CASES()}/${id}/property/${propertyId}/valuation_report`;
export const PROPERTY_TITLE_NUMBER_OF_CASE = (id, propertyId) =>
  `${CASES()}/${id}/property/${propertyId}/title_number`;

export const SUMMARY_OF_CASE = (id) => `${CASES()}/${id}/case_summary`;

export const CASE = (id) => `${CASES()}/${id}`;

export const CASE_STAGE = (id) => `${CASES()}/${id}/stage`;

export const CASE_STATUS = (id) => `${CASES()}/${id}/status`;
export const CASE_TAGS = (id) => `${CASES()}/${id}/associatedTags`;

export const CASE_TAG = (id) => (tagId) => `${CASE_TAGS(id)}/${tagId}`;

export const CASE_SUMMARY_STEP = (id, stepId) =>
  `${SUMMARY_OF_CASE(id)}/${stepId}`;

export const ADMIN_RECORDS = (recordsName) => `${BACKEND_URL}${recordsName}`;

export const ADMIN_RECORD = (recordsName, recordId) =>
  `${ADMIN_RECORDS(recordsName)}/${recordId}`;

export const COMPLETED = (id) => `${CASES()}/${id}/completed`;
export const ADJUSTMENTS = (id) => `${COMPLETED(id)}/adjustments`;
export const WAYPOINTS = (id) => `${COMPLETED(id)}/waypoints`;
export const CASHFLOWS = (id) => `${COMPLETED(id)}/cashflows`;
export const COMPLETED_SECURITIES = (id) => `${COMPLETED(id)}/securities`;
export const FURTHER_DRAWDOWNS = (id) => `${COMPLETED(id)}/furtherDrawdowns`;

export const ORIGINATION_CHECKLIST = (further) => (id, furtherId) =>
  `${further(id)}/${furtherId}/originationChecklist`;

export const ORIGINATION_CHECKLIST_FIELD = (further) => (
  id,
  furtherId,
  sectionName,
  field
) => `${ORIGINATION_CHECKLIST(further)(id, furtherId)}/${sectionName}/${field}`;

export const UNDERWRITER_FLOW = (further) => (id, furtherId) =>
  `${further(id)}/${furtherId}/underwriterFlow`;

export const ESTIMATED_REDEMPTIONS = (id) =>
  `${COMPLETED(id)}/estimatedRedemptions`;

export const ESTIMATED_REDEMPTION = (id) => (estimatedRedemptionId) =>
  `${ESTIMATED_REDEMPTIONS(id)}/${estimatedRedemptionId}`;

export const EXPECTED_DRAWDOWNS = (id) => `${COMPLETED(id)}/expectedDrawdowns`;

export const EXPECTED_DRAWDOWN = (id) => (expectedDrawdownId) =>
  `${EXPECTED_DRAWDOWNS(id)}/${expectedDrawdownId}`;

export const FURTHER_ADVANCES = (id) => `${COMPLETED(id)}/furtherAdvances`;

export const WAYPOINT = (id) => (waypointId) =>
  `${WAYPOINTS(id)}/${waypointId}`;

export const NOTES = (id) => `${COMPLETED(id)}/notes`;

export const NOTE = (id) => (noteId) => `${NOTES(id)}/${noteId}`;

export const DEFAULT_EVENTS = (id) => `${COMPLETED(id)}/defaultEvents`;

export const DEFAULT_EVENT = (id) => (defaultEventId) =>
  `${DEFAULT_EVENTS(id)}/${defaultEventId}`;

export const EXTENSIONS = (id) => `${COMPLETED(id)}/extensions`;

export const MANUAL_STATUSES = (id) => `${COMPLETED(id)}/manualStatuses`;

export const MANUAL_STATUS = (id) => (manualStatusId) =>
  `${MANUAL_STATUSES(id)}/${manualStatusId}`;

export const ADJUSTMENT = (id) => (adjustmentId) =>
  `${ADJUSTMENTS(id)}/${adjustmentId}`;

export const ADJUSTMENT_CORRECTIONS = (id) => (adjustmentId) =>
  `${ADJUSTMENTS(id)}/${adjustmentId}/corrections`;

export const COMPLETED_SECURITY = (id) => (securityId) =>
  `${COMPLETED_SECURITIES(id)}/${securityId}`;

export const SECURITY_NOTES = (id) => (securityId) =>
  `${COMPLETED_SECURITY(id)(securityId)}/notes`;

export const SECURITY_VALUATIONS = (id) => (securityId) =>
  `${COMPLETED_SECURITY(id)(securityId)}/valuations`;

export const SECURITY_RELEASES = (id) => (securityId) =>
  `${COMPLETED_SECURITY(id)(securityId)}/releases`;

export const SECURITY_CONVERSIONS = (id) => (securityId) =>
  `${COMPLETED_SECURITY(id)(securityId)}/conversions`;

export const ALL_WAYPOINTS = () => `${BACKEND_URL}waypoints`;

export const POSTCODER_URL = "https://ws.postcoder.com/pcw";

export const CALCULATOR_STATEMENT = () => `${CALCULATOR_URL}statement`;

export const CALCULATOR_WATERFALL = () => `${CALCULATOR_URL}waterfall`;

export const CALCULATOR_END_OF_MONTH = () => `${CALCULATOR_URL}end_of_month`;

export const USER_IDENTITIES = () => `${BACKEND_URL}users/identities`;

export const CASE_ASSIGNED_USER = (id) => `${CASES()}/${id}/assignedUser`;

export const CROSS_COLLATERALISED_LOANS = (id) =>
  `${CASES()}/${id}/crossCollateralisedLoans`;

export const CROSS_COLLATERALISED_LOAN = (id) => (crossId) =>
  `${CROSS_COLLATERALISED_LOANS(id)}/${crossId}`;
