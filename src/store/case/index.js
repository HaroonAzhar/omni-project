import { createSlice } from "@reduxjs/toolkit";

const caseSlice = createSlice({
  name: "case",
  initialState: {},
  reducers: {
    addCaseData(_state, action) {
      const { caseCore } = action.payload;
      return { ...caseCore };
    },

    updateCaseNumber(state, action) {
      return { ...state, CaseNr: action.payload };
    },
  },
});

export const { addCaseData, updateCaseNumber } = caseSlice.actions;

export default caseSlice.reducer;
