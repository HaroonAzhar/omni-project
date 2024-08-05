import { createSlice } from "@reduxjs/toolkit";

const estimatedRedemptionsSlice = createSlice({
  name: "estimatedRedemptions",
  initialState: [],
  reducers: {
    insertEstimatedRedemptionsData(state, action) {
      const { estimatedRedemptions } = action.payload;
      return [...estimatedRedemptions];
    },
  },
});

export const {
  insertEstimatedRedemptionsData,
} = estimatedRedemptionsSlice.actions;

export default estimatedRedemptionsSlice.reducer;
