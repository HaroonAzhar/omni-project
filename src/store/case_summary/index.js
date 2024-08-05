import { createSlice } from "@reduxjs/toolkit";

const caseSummarySlice = createSlice({
  name: "caseSummary",
  initialState: {},
  reducers: {
    insertCaseSummaryData(state, action) {
      const { caseSummary } = action.payload;
      return { ...caseSummary };
    },
  },
});

export const { insertCaseSummaryData } = caseSummarySlice.actions;

export default caseSummarySlice.reducer;
