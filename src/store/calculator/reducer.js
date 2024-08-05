import { SAVE_CALCULATOR_DATA, REMOVE_CALCULATOR_DATA } from "./actions";

const initialState = {
  calculatorResponse: {},
  calculatorInput: {},
};

function calculator(state = initialState, action) {
  switch (action.type) {
    case SAVE_CALCULATOR_DATA: {
      return { ...state, ...action.data };
    }
    case REMOVE_CALCULATOR_DATA: {
      return initialState;
    }
    default:
      return state;
  }
}

export default calculator;
