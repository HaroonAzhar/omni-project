import { createSlice } from "@reduxjs/toolkit";

const cashflowsSlice = createSlice({
  name: "cashflows",
  initialState: [],
  reducers: {
    insertCashflowsData(state, action) {
      const { cashflows } = action.payload;
      return [...cashflows];
    },
  },
});

export const { insertCashflowsData } = cashflowsSlice.actions;

export default cashflowsSlice.reducer;
