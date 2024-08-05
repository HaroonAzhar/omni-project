export const SAVE_CALCULATOR_DATA = "SAVE_CALCULATOR_DATA";
export const REMOVE_CALCULATOR_DATA = "REMOVE_CALCULATOR_DATA";

export const saveCalculatorData = (data) => ({
  type: SAVE_CALCULATOR_DATA,
  data,
});

export const removeCalculatorData = () => ({
  type: REMOVE_CALCULATOR_DATA,
});
