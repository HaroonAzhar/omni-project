import { createSlice } from "@reduxjs/toolkit";

const completedSlice = createSlice({
  name: "completed",
  initialState: {},
  reducers: {
    insertCompletedData(state, action) {
      const { completed } = action.payload;
      return { ...completed };
    },
  },
});

export const { insertCompletedData } = completedSlice.actions;

export default completedSlice.reducer;
