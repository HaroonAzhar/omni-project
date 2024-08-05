import { createSlice } from "@reduxjs/toolkit";

const adjustmentsSlice = createSlice({
  name: "adjustments",
  initialState: [],
  reducers: {
    insertAdjustmentsData(state, action) {
      const { adjustments } = action.payload;
      return [...adjustments];
    },
  },
});

export const { insertAdjustmentsData } = adjustmentsSlice.actions;

export default adjustmentsSlice.reducer;
