import axios from "axios";

import {
  ADDITIONAL_INFORMATION_OF_CASE,
  APPLICANT_OF_CASE,
  APPLICATION_OF_CASE,
  CASES,
  DECLARATION_AND_SIGNATURE_OF_CASE,
  DIP_OF_CASE,
  ENQUIRY_OF_CASE,
  INTRODUCER_OF_CASE,
  LOAN_OF_CASE,
  PROPERTY_OF_CASE,
  REF_OF_CASE,
  SELECTED_CASE,
  SOLICITORS_OF_CASE,
  PROPERTY_VALUATION_OF_CASE,
  SUMMARY_OF_CASE,
  CASE_SUMMARY_STEP,
  USER,
  PROPERTY_TITLE_NUMBER_OF_CASE,
  ADMIN_RECORDS,
  ADMIN_RECORD,
  AML_KYC_VALIDATION,
  CASE,
  CASE_STAGE,
  ADJUSTMENTS,
  WAYPOINTS,
  WAYPOINT,
  NOTES,
  NOTE,
  ALL_WAYPOINTS,
  USER_IDENTITIES,
  CASE_ASSIGNED_USER,
  DEFAULT_EVENTS,
  DEFAULT_EVENT,
  EXTENSIONS,
  MANUAL_STATUSES,
  MANUAL_STATUS,
  CASHFLOWS,
  ADJUSTMENT,
  ADJUSTMENT_CORRECTIONS,
  CASE_STATUS,
  COMPLETED_SECURITIES,
  SECURITY_NOTES,
  SECURITY_VALUATIONS,
  SECURITY_RELEASES,
  FURTHER_DRAWDOWNS,
  ORIGINATION_CHECKLIST,
  ORIGINATION_CHECKLIST_FIELD,
  UNDERWRITER_FLOW,
  SECURITY_CONVERSIONS,
  CASE_TAGS,
  CASE_TAG,
  ESTIMATED_REDEMPTION,
  ESTIMATED_REDEMPTIONS,
  EXPECTED_DRAWDOWNS,
  EXPECTED_DRAWDOWN,
  CROSS_COLLATERALISED_LOANS,
  CROSS_COLLATERALISED_LOAN,
  FURTHER_ADVANCES,
} from "utils/urls";

import { unpackInterceptor, withTokenInterceptor } from "../axios_interceptors";

const options = {
  headers: {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  },
};

const apiAxiosInstance = axios.create();
apiAxiosInstance.interceptors.response.use(unpackInterceptor);
apiAxiosInstance.interceptors.request.use(withTokenInterceptor);

export { apiAxiosInstance };

export const getUser = () => apiAxiosInstance.get(USER());

export const getCases = (CaseNr = "") => apiAxiosInstance.get(CASES(CaseNr));

export const createCase = () => apiAxiosInstance.post(CASES());

export const createCaseReference = (clientName, id) =>
  apiAxiosInstance.post(
    REF_OF_CASE(id),
    {
      clientName,
    },
    options
  );

export const createDip = (id) =>
  apiAxiosInstance.post(DIP_OF_CASE(id), {}, options);

export const getDip = (id) => apiAxiosInstance(DIP_OF_CASE(id));

export const saveDip = ({ data, step_id, id }) =>
  apiAxiosInstance.patch(
    DIP_OF_CASE(id),
    {
      data: {
        type: "dip_form",
        id,
        attributes: {
          dip: data,
          step_id,
        },
      },
    },
    options
  );

export const saveDipIntroducer = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/introducer`, data, options);

export const saveDipBrokerDetails = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/broker`, data, options);

export const saveDipAdvanceType = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/advance_type`, data, options);

export const saveDipContactCompany = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/contact_company`, data, options);

export const saveDipContactIndividual = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/contact_individual`, data, options);

export const saveDipBuildingType = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/building_type`, data, options);

export const saveDipSecurities = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/securities`, data, options);

export const saveDipLoanDetails = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/loan_details`, data, options);

export const saveDipFinancialDetails = (data, id) =>
  apiAxiosInstance.post(`${DIP_OF_CASE(id)}/financial_details`, data, options);

export const saveDipFinancialCalculatorDetails = (data, id) =>
  apiAxiosInstance.post(
    `${DIP_OF_CASE(id)}/financial_calculator_details`,
    data,
    options
  );

export const deleteDip = (id) =>
  apiAxiosInstance({
    method: "delete",
    url: DIP_OF_CASE(id),
    data: null,
    headers: options,
  });

export const convertDip = ({ id }) =>
  apiAxiosInstance.patch(
    `${CASES()}/${id}`,
    {
      data: {
        type: "dip_form",
        id,
        attributes: {
          step_id: "convert_to_application",
        },
      },
    },
    options
  );

export const createEnquiry = (id, data) =>
  apiAxiosInstance.post(ENQUIRY_OF_CASE(id), data, options);

export const getEnquiry = (id) => apiAxiosInstance(ENQUIRY_OF_CASE(id));

export const saveEnquiry = ({ data, step_id, id }) =>
  apiAxiosInstance.patch(
    ENQUIRY_OF_CASE(id),
    {
      data: {
        type: "enquiry_form",
        id,
        attributes: {
          enquiry: data,
          step_id,
        },
      },
    },
    options
  );

export const convertEnquiry = (id) =>
  apiAxiosInstance.post(
    CASE_STAGE(id),
    {
      Stage: "dip",
    },
    options
  );

export const getApplication = (id) => apiAxiosInstance(APPLICATION_OF_CASE(id));

export const patchApplicant = ({
  id,
  applicant: { applicant_id, ...attributes },
  applicantType,
}) => {
  return apiAxiosInstance.patch(
    `${APPLICANT_OF_CASE(id)}/${applicantType}/${applicant_id}`,
    {
      data: {
        type: "application_form",
        id,
        attributes,
      },
    },
    options
  );
};

export const saveApplicant = ({ attributes, id }) =>
  apiAxiosInstance.post(
    APPLICANT_OF_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes,
      },
    },
    options
  );

export const getApplicant = (id) => apiAxiosInstance.get(APPLICANT_OF_CASE(id));

export const deleteApplicant = ({
  id,
  applicant: { applicant_id },
  applicantType,
}) => {
  return apiAxiosInstance.delete(
    `${APPLICANT_OF_CASE(id)}/${applicantType}/${applicant_id}`,
    options
  );
};

export const saveProperty = ({ attributes, id }) =>
  apiAxiosInstance.post(
    PROPERTY_OF_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes,
      },
    },
    options
  );

export const getProperty = (id) => apiAxiosInstance.get(PROPERTY_OF_CASE(id));

export const saveLoanDetails = (id, loan_details) =>
  apiAxiosInstance.patch(
    LOAN_OF_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          loan_details,
        },
      },
    },
    options
  );

export const saveIntroducerDetails = (id, introducer_details) =>
  apiAxiosInstance.patch(
    INTRODUCER_OF_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          introducer_details,
        },
      },
    },
    options
  );

export const saveSolicitorsDetails = (id, solicitors_details) =>
  apiAxiosInstance.patch(
    SOLICITORS_OF_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          solicitors_details,
        },
      },
    },
    options
  );

export const saveAdditionalInformation = (id, additional_information) =>
  apiAxiosInstance.patch(
    ADDITIONAL_INFORMATION_OF_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          additional_information,
        },
      },
    },
    options
  );

export const saveDeclarationsAndSignatures = (id, applicants) =>
  apiAxiosInstance.patch(
    DECLARATION_AND_SIGNATURE_OF_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          applicants,
        },
      },
    },
    options
  );

export const changeCaseStatus = (id, status, type) =>
  apiAxiosInstance.patch(
    SELECTED_CASE(id),
    {
      data: {
        type,
        id,
        attributes: {
          status,
        },
      },
    },
    options
  );

export const changeStatusOfCase = (id, Status) =>
  apiAxiosInstance.post(
    CASE_STATUS(id),
    {
      Status,
    },
    options
  );

export const changeApplicationStatus = (id, status) =>
  changeCaseStatus(id, status, "application_form");

export const changeDipStatus = (id, status) =>
  changeCaseStatus(id, status, "dip_form");

export const backApplicationToDip = (id) =>
  apiAxiosInstance.patch(
    SELECTED_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          step_id: "back_to_dip",
        },
      },
    },
    options
  );

export const backDipToApplication = (id) =>
  apiAxiosInstance.patch(
    SELECTED_CASE(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          step_id: "back_to_application",
        },
      },
    },
    options
  );

export const saveValuationReportFlow = (id, propertyId, payload) =>
  apiAxiosInstance.patch(
    PROPERTY_VALUATION_OF_CASE(id, propertyId),
    {
      data: {
        type: "application_form",
        id,
        attributes: payload,
      },
    },
    options
  );

export const convertCompleted = (id) =>
  apiAxiosInstance.patch(
    `${CASES()}/${id}`,
    {
      data: {
        type: "completed_form",
        id,
        attributes: {
          step_id: "convert_to_redeemed",
        },
      },
    },
    options
  );

export const convertToCaseSummary = (id) =>
  apiAxiosInstance.post(
    CASE_STAGE(id),
    {
      Stage: "case_summary",
    },
    options
  );

export const backCaseSummaryToApplication = (id) =>
  apiAxiosInstance.patch(
    `${CASES()}/${id}`,
    {
      data: {
        type: "dip_form",
        id,
        attributes: {
          step_id: "back_case_summary_to_application",
        },
      },
    },
    options
  );

export const getCaseSummary = (id) => apiAxiosInstance(SUMMARY_OF_CASE(id));

export const saveFurtherComments = (id, further_comments) =>
  apiAxiosInstance.patch(
    SUMMARY_OF_CASE(id),
    {
      data: {
        type: "further_comments",
        id,
        attributes: {
          further_comments,
        },
      },
    },
    options
  );

export const saveSummaryData = (id, stepId, data) =>
  apiAxiosInstance.patch(
    CASE_SUMMARY_STEP(id, stepId),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          [stepId]: data,
        },
      },
    },
    options
  );

export const saveTitleNumbers = (id, propertyId, titleNumbers) =>
  apiAxiosInstance.patch(
    PROPERTY_TITLE_NUMBER_OF_CASE(id, propertyId),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          ...titleNumbers,
        },
      },
    },
    options
  );

export const saveAmlKyc = (caseId, data) => {
  const { applicant_id, isCompany, ...attributes } = data;

  const companyIndividualPathPart = isCompany ? "company" : "individuals";
  return apiAxiosInstance.post(
    `${APPLICANT_OF_CASE(
      caseId
    )}/${companyIndividualPathPart}/${applicant_id}/aml_kyc`,
    {
      data: {
        type: "aml_kyc_form",
        id: caseId,
        attributes,
      },
    },
    options
  );
};

export const getAdminRecords = (recordsName, currentRecordId, searchQuery) => {
  const params = new URLSearchParams();
  if (currentRecordId) {
    params.append("currentRecordId", currentRecordId);
  }
  if (searchQuery) {
    params.append("search", searchQuery);
  }
  const config = {
    ...options,
    params,
  };
  return apiAxiosInstance.get(ADMIN_RECORDS(recordsName), config);
};

export const getAdminRecord = (recordsName, recordId) =>
  apiAxiosInstance.get(ADMIN_RECORD(recordsName, recordId), options);

const postAdminRecord = (recordsName, body) =>
  apiAxiosInstance.post(ADMIN_RECORDS(recordsName), body, options);

const patchAdminRecord = (recordsName, recordId, body) =>
  apiAxiosInstance.patch(ADMIN_RECORD(recordsName, recordId), body, options);

export const saveAdminRecord = (recordsName, recordId, record) => {
  return recordId
    ? patchAdminRecord(recordsName, recordId, record)
    : postAdminRecord(recordsName, record);
};

export const deleteAdminRecord = (recordsName, recordId) =>
  apiAxiosInstance.delete(ADMIN_RECORD(recordsName, recordId), options);

export const saveAmlKycValidation = (id, aml_kyc_validation) =>
  apiAxiosInstance.patch(
    AML_KYC_VALIDATION(id),
    {
      data: {
        type: "application_form",
        id,
        attributes: {
          ...aml_kyc_validation,
        },
      },
    },
    options
  );

export const getCase = (id) => apiAxiosInstance(CASE(id));

export const convertToCompleted = (id, params) =>
  apiAxiosInstance.post(
    CASE_STAGE(id),
    {
      Stage: "completed",
      ...params,
    },
    options
  );

export const saveAdjustment = (id, values) =>
  apiAxiosInstance.post(
    ADJUSTMENTS(id),
    {
      ...values,
    },
    options
  );

export const getAdjustments = (id, queryParams = "") =>
  apiAxiosInstance.get(ADJUSTMENTS(id) + queryParams, options);

export const saveCashflow = (id, values) =>
  apiAxiosInstance.post(
    CASHFLOWS(id),
    {
      ...values,
    },
    options
  );

export const getCashflows = (id, queryParams = "") =>
  apiAxiosInstance.get(CASHFLOWS(id) + queryParams, options);

export const getCompletedSecurities = (id) =>
  apiAxiosInstance.get(COMPLETED_SECURITIES(id), options);

export const saveWaypoint = (id, values) =>
  apiAxiosInstance.post(
    WAYPOINTS(id),
    {
      ...values,
    },
    options
  );

export const getWaypoints = (id, queryParams = "") =>
  apiAxiosInstance.get(WAYPOINTS(id) + queryParams, options);

export const deleteWaypoint = (id, waypointId) =>
  apiAxiosInstance.delete(WAYPOINT(id)(waypointId), options);

export const updateWaypoint = (id, waypointId, waypoint) =>
  apiAxiosInstance.patch(
    WAYPOINT(id)(waypointId),
    {
      ...waypoint,
    },
    options
  );

export const saveNote = (id, values) =>
  apiAxiosInstance.post(
    NOTES(id),
    {
      ...values,
    },
    options
  );

export const getNotes = (id, queryParams) =>
  apiAxiosInstance.get(NOTES(id) + queryParams, options);

export const deleteNote = (id, noteId) =>
  apiAxiosInstance.delete(NOTE(id)(noteId), options);

export const updateNote = (id, noteId, note) =>
  apiAxiosInstance.patch(
    NOTE(id)(noteId),
    {
      ...note,
    },
    options
  );

export const getAllWaypoints = (queryParams = "") =>
  apiAxiosInstance.get(`${ALL_WAYPOINTS()}${queryParams}`, options);

export const getUserIdentities = (id) =>
  apiAxiosInstance.get(USER_IDENTITIES(id), options);

export const assignUserToCase = (id, params) =>
  apiAxiosInstance.post(CASE_ASSIGNED_USER(id), params, options);

export const removeUserFromCase = (id) =>
  apiAxiosInstance.delete(CASE_ASSIGNED_USER(id), options);

export const saveDefaultEvent = (id, values) =>
  apiAxiosInstance.post(
    DEFAULT_EVENTS(id),
    {
      ...values,
    },
    options
  );

export const getDefaultEvents = (id, queryParams) =>
  apiAxiosInstance.get(DEFAULT_EVENTS(id) + queryParams, options);

export const getDefaultEventsPeriods = (id) =>
  apiAxiosInstance.get(`${DEFAULT_EVENTS(id)}/periods`, options);

export const deleteDefaultEvent = (id, defaultEventId) =>
  apiAxiosInstance.delete(DEFAULT_EVENT(id)(defaultEventId), options);

export const saveExtension = (id, values) =>
  apiAxiosInstance.post(
    EXTENSIONS(id),
    {
      ...values,
    },
    options
  );

export const getExtensions = (id, queryParams) =>
  apiAxiosInstance.get(EXTENSIONS(id) + queryParams, options);

export const saveManualStatus = (id, values) =>
  apiAxiosInstance.post(
    MANUAL_STATUSES(id),
    {
      ...values,
    },
    options
  );

export const getManualStatuses = (id, queryParams) =>
  apiAxiosInstance.get(MANUAL_STATUSES(id) + queryParams, options);

export const deleteManualStatus = (id, manualStatusId) =>
  apiAxiosInstance.delete(MANUAL_STATUS(id)(manualStatusId), options);

export const deleteAdjustment = (id, adjustmentId) =>
  apiAxiosInstance.delete(ADJUSTMENT(id)(adjustmentId), options);

export const correctAdjustment = (id, adjustmentId, values) =>
  apiAxiosInstance.post(
    ADJUSTMENT_CORRECTIONS(id)(adjustmentId),
    values,
    options
  );

export const saveSecurityNote = (id, securityId, values) =>
  apiAxiosInstance.post(SECURITY_NOTES(id)(securityId), values, options);

export const saveSecurityValuation = (id, securityId, values) =>
  apiAxiosInstance.post(SECURITY_VALUATIONS(id)(securityId), values, options);

export const saveSecurityRelease = (id, securityId, values) =>
  apiAxiosInstance.post(SECURITY_RELEASES(id)(securityId), values, options);

export const saveSecurityConversion = (id, securityId, values) =>
  apiAxiosInstance.post(SECURITY_CONVERSIONS(id)(securityId), values, options);

export const saveFurtherDrawdown = (id, values) =>
  apiAxiosInstance.post(
    FURTHER_DRAWDOWNS(id),
    {
      ...values,
    },
    options
  );

export const getFurtherDrawdowns = (id) =>
  apiAxiosInstance.get(FURTHER_DRAWDOWNS(id), options);

const saveOriginationChecklistSection = (further) => (sectionName) => (
  id,
  furtherId,
  field,
  values
) =>
  apiAxiosInstance.post(
    ORIGINATION_CHECKLIST_FIELD(further)(id, furtherId, sectionName, field),
    {
      ...values,
    },
    options
  );

export const saveOriginationChecklistSectionFurtherDrawdowns = saveOriginationChecklistSection(
  FURTHER_DRAWDOWNS
);
export const saveOriginationChecklistSectionFurtherAdvances = saveOriginationChecklistSection(
  FURTHER_ADVANCES
);

const updateOriginationChecklistSection = (further) => (sectionName) => (
  id,
  furtherId,
  field,
  values
) => {
  const { OriginationChecklistLandChargesResultsId, ...content } = values;
  return apiAxiosInstance.patch(
    `${ORIGINATION_CHECKLIST_FIELD(further)(
      id,
      furtherId,
      sectionName,
      field
    )}/${OriginationChecklistLandChargesResultsId}`,
    content,
    options
  );
};

export const updateOriginationChecklistSectionFurtherDrawdowns = updateOriginationChecklistSection(
  FURTHER_DRAWDOWNS
);
export const updateOriginationChecklistSectionFurtherAdvances = updateOriginationChecklistSection(
  FURTHER_ADVANCES
);

const saveOriginationChecklistField = (further) => (
  id,
  furtherId,
  field,
  values
) =>
  apiAxiosInstance.post(
    `${ORIGINATION_CHECKLIST(further)(id, furtherId)}/${field}`,
    {
      ...values,
    },
    options
  );

export const saveOriginationChecklistFieldFurtherDrawdowns = saveOriginationChecklistField(
  FURTHER_DRAWDOWNS
);
export const saveOriginationChecklistFieldFurtherAdvances = saveOriginationChecklistField(
  FURTHER_ADVANCES
);

const saveUnderwriterFlowField = (further) => (id, furtherId, field, values) =>
  apiAxiosInstance.post(
    `${UNDERWRITER_FLOW(further)(id, furtherId)}/${field}`,
    {
      ...values,
    },
    options
  );

export const saveUnderwriterFlowFieldFurtherDrawdowns = saveUnderwriterFlowField(
  FURTHER_DRAWDOWNS
);
export const saveUnderwriterFlowFieldFurtherAdvances = saveUnderwriterFlowField(
  FURTHER_ADVANCES
);

export const saveNewCompletedSecurity = (id, values) =>
  apiAxiosInstance.post(COMPLETED_SECURITIES(id), values, options);

export const addAssociatedTag = (id, values) =>
  apiAxiosInstance.post(CASE_TAGS(id), { ...values });

export const getAssociatedTags = (id) => apiAxiosInstance.get(CASE_TAGS(id));

export const deleteAssociatedTag = (id, tagId) =>
  apiAxiosInstance.delete(CASE_TAG(id)(tagId), options);

export const saveEstimatedRedemption = (id, values) =>
  apiAxiosInstance.post(
    ESTIMATED_REDEMPTIONS(id),
    {
      ...values,
    },
    options
  );

export const saveExpectedDrawdown = (id, values) =>
  apiAxiosInstance.post(
    EXPECTED_DRAWDOWNS(id),
    {
      ...values,
    },
    options
  );

export const getEstimatedRedemptions = (id) =>
  apiAxiosInstance.get(ESTIMATED_REDEMPTIONS(id), options);

export const editEstimatedRedemption = (id, estimatedRedemptionId, values) =>
  apiAxiosInstance.patch(
    ESTIMATED_REDEMPTION(id)(estimatedRedemptionId),

    {
      ...values,
    },
    options
  );
export const getExpectedDrawdowns = (id) =>
  apiAxiosInstance.get(EXPECTED_DRAWDOWNS(id), options);

export const editExpectedDrawdown = (id, expectedDrawdownId, values) =>
  apiAxiosInstance.patch(
    EXPECTED_DRAWDOWN(id)(expectedDrawdownId),
    {
      ...values,
    },
    options
  );

export const deleteEstimatedRedemption = (id, estimatedRedemptionId, values) =>
  apiAxiosInstance.delete(
    ESTIMATED_REDEMPTION(id)(estimatedRedemptionId),
    {
      ...values,
    },
    options
  );

export const deleteExpectedDrawdown = (id, expectedDrawdownId, values) =>
  apiAxiosInstance.delete(
    EXPECTED_DRAWDOWN(id)(expectedDrawdownId),
    {
      ...values,
    },
    options
  );

export const getCrossCollateralisedLoans = (id) =>
  apiAxiosInstance.get(CROSS_COLLATERALISED_LOANS(id), options);

export const saveCrossCollateralisedLoan = (id, values) =>
  apiAxiosInstance.post(
    CROSS_COLLATERALISED_LOANS(id),
    {
      ...values,
    },
    options
  );

export const deleteCrossCollateralisedLoan = (
  id,
  crossCollatealisedLoanId,
  values
) =>
  apiAxiosInstance.delete(
    CROSS_COLLATERALISED_LOAN(id)(crossCollatealisedLoanId),
    {
      ...values,
    },
    options
  );

export const saveFurtherAdvance = (id, values) =>
  apiAxiosInstance.post(
    FURTHER_ADVANCES(id),
    {
      ...values,
    },
    options
  );

export const getFurtherAdvances = (id) =>
  apiAxiosInstance.get(FURTHER_ADVANCES(id), options);
