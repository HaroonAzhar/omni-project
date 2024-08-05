import { createSlice } from "@reduxjs/toolkit";

const furtherAdvancesSlice = createSlice({
  name: "furtherAdvances",
  initialState: [],
  reducers: {
    insertFurtherAdvancesData(state, action) {
      const { furtherAdvances } = action.payload;
      return [...furtherAdvances];
    },
  },
});

export const { insertFurtherAdvancesData } = furtherAdvancesSlice.actions;

export default furtherAdvancesSlice.reducer;
