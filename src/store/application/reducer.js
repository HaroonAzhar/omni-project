import {
  SAVE_APPLICATION_DATA,
  REMOVE_APPLICATION_DATA,
  SAVE_COMPANY_DATA,
  SAVE_LOAN_DATA,
  SAVE_INTRODUCER_DATA,
  SAVE_SOLICITORS_DATA,
  SAVE_ADDITIONAL_DATA,
  SAVE_VALUATION_REPORT,
  SAVE_VALUATION_OVERVIEW,
  SAVE_LOAN_SUMMARY,
  ADD_ASSET,
  REMOVE_ASSET,
  SAVE_APPLICANT,
  SAVE_ALL_APPLICANTS,
  SAVE_PROPERTY,
  SAVE_AML_KYC_VALIDATION,
} from "./actions";
import caseSummaryReducerSwitch from "./case_summary_reducer";

const initialState = {};

function application(state = initialState, action) {
  switch (action.type) {
    case SAVE_APPLICATION_DATA: {
      return action.applicationData;
    }
    case SAVE_APPLICANT: {
      const { indexOfElement, applicantData } = action;

      const newIndividuals = [...state.individuals];

      newIndividuals[indexOfElement] = applicantData;

      return {
        ...state,
        individuals: newIndividuals,
      };
    }
    case SAVE_ALL_APPLICANTS: {
      return {
        ...state,
        individuals: action.applicantsData,
      };
    }
    case SAVE_PROPERTY: {
      const { indexOfProperty, propertyData } = action;

      const newProperties = [...state.properties];

      newProperties[indexOfProperty] = propertyData;

      return {
        ...state,
        properties: newProperties,
      };
    }
    case SAVE_COMPANY_DATA: {
      return {
        ...state,
        companyData: {
          ...state.companyData,
          ...action.companyData,
          base_data: {
            ...(state.companyData && state.companyData.base_data),
            ...(action.companyData && action.companyData.base_data),
          },
        },
      };
    }
    case SAVE_LOAN_DATA: {
      return {
        ...state,
        application_loan_details: {
          ...state.application_loan_details,
          ...action.application_loan_details,
        },
      };
    }
    case SAVE_INTRODUCER_DATA: {
      return {
        ...state,
        introducer_details: {
          ...state.introducer_details,
          ...action.introducer_details,
        },
      };
    }
    case SAVE_SOLICITORS_DATA: {
      return {
        ...state,
        solicitor_details: {
          ...state.solicitor_details,
          ...action.solicitor_details,
        },
      };
    }
    case SAVE_ADDITIONAL_DATA: {
      return {
        ...state,
        additional_information: {
          ...state.additional_information,
          ...action.additional_information,
        },
      };
    }
    case SAVE_AML_KYC_VALIDATION: {
      return {
        ...state,
        aml_kyc_validation: {
          ...state.aml_kyc_validation,
          ...action.aml_kyc_validation,
        },
      };
    }
    case SAVE_VALUATION_REPORT: {
      let newPropertiesState = [];

      if (state.properties) {
        newPropertiesState = [...state.properties];

        newPropertiesState[action.indexOfProperty] = {
          ...newPropertiesState[action.indexOfProperty],
          valuation_report: action.valuation_report,
        };
      }

      return {
        ...state,
        properties: newPropertiesState,
      };
    }
    case SAVE_VALUATION_OVERVIEW: {
      return {
        ...state,
        valuation_overview: {
          ...state.valuation_overview,
          ...action.data,
        },
      };
    }
    case SAVE_LOAN_SUMMARY: {
      return {
        ...state,
        loan: {
          ...state.loan,
          ...action.data,
        },
      };
    }
    case ADD_ASSET: {
      const newIndividuals = [...state.individuals];
      newIndividuals[action.indexOfElement].assets.push({});

      return {
        ...state,
        individuals: newIndividuals,
      };
    }
    case REMOVE_ASSET: {
      const newIndividuals = [...state.individuals];

      newIndividuals[action.indexOfElement].assets.splice(action.indexOfAsset);

      return {
        ...state,
        individuals: newIndividuals,
      };
    }
    case REMOVE_APPLICATION_DATA: {
      return {};
    }
    default:
      return caseSummaryReducerSwitch(state, action);
  }
}

export default application;
