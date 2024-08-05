import {
  SAVE_TITLE_NUMBERS,
  SAVE_FURTHER_COMMENTS,
  SAVE_RISK_AND_MITIGATION,
  SAVE_CASE_OVERVIEW,
  SAVE_SECURITY_OVERVIEW,
  UPDATE_RISK_INPUT,
  SAVE_BORROWER_PROFILE,
} from "./actions";

function caseSummaryReducerSwitch(state, action) {
  switch (action.type) {
    case SAVE_TITLE_NUMBERS: {
      let newPropertiesState = [];

      if (state.properties) {
        newPropertiesState = [...state.properties];

        newPropertiesState[action.indexOfProperty] = {
          ...newPropertiesState[action.indexOfProperty],
          ...action.title_numbers,
        };
      }

      return {
        ...state,
        properties: newPropertiesState,
      };
    }
    case SAVE_FURTHER_COMMENTS: {
      return {
        ...state,
        summary: {
          ...state.summary,
          further_comments: {
            ...state.summary.further_comments,
            ...action.data,
          },
        },
      };
    }
    case SAVE_RISK_AND_MITIGATION: {
      return {
        ...state,
        summary: {
          ...state.summary,
          risk_mitigations: {
            ...state.summary.risk_mitigations,
            ...action.data,
          },
        },
      };
    }
    case UPDATE_RISK_INPUT: {
      const newRiskInputs = action.data;

      return {
        ...state,
        summary: {
          ...state.summary,
          risk_mitigations: {
            ...state.summary.risk_mitigations,
            risk_inputs: newRiskInputs,
          },
        },
      };
    }
    case SAVE_CASE_OVERVIEW: {
      return {
        ...state,
        summary: {
          ...state.summary,
          overview: {
            ...state.summary.overview,
            ...action.data,
          },
        },
      };
    }
    case SAVE_SECURITY_OVERVIEW: {
      return {
        ...state,
        summary: {
          ...state.summary,
          security: {
            ...state.summary.security,
            ...action.data,
          },
        },
      };
    }
    case SAVE_BORROWER_PROFILE: {
      return {
        ...state,
        summary: {
          ...state.summary,
          borrower: {
            ...state.summary.borrower,
            ...action.data,
          },
        },
      };
    }
    default:
      return state;
  }
}

export default caseSummaryReducerSwitch;
