import { createSlice } from "@reduxjs/toolkit";

const furtherDrawdownsSlice = createSlice({
  name: "furtherDrawdowns",
  initialState: [],
  reducers: {
    insertFurtherDrawdownsData(state, action) {
      const { furtherDrawdowns } = action.payload;
      return [...furtherDrawdowns];
    },
  },
});

export const { insertFurtherDrawdownsData } = furtherDrawdownsSlice.actions;

export default furtherDrawdownsSlice.reducer;
