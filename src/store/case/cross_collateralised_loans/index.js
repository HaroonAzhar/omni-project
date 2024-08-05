import { createSlice } from "@reduxjs/toolkit";

const crossCollateralisedLoansSlice = createSlice({
  name: "crossCollateralisedLoans",
  initialState: [],
  reducers: {
    insertCrossCollateralisedLoansData(state, action) {
      const { crossCollateralisedLoans } = action.payload;
      return [...crossCollateralisedLoans];
    },
  },
});

export const {
  insertCrossCollateralisedLoansData,
} = crossCollateralisedLoansSlice.actions;

export default crossCollateralisedLoansSlice.reducer;
