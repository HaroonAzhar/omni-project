import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    addAdminRecord(state, action) {
      const { page } = action.payload;
      state[page] = [...(state[page] || []), {}];
    },
    removeLastAddedRecord(state, action) {
      const { page } = action.payload;
      state[page].pop();
    },
    addAdminRecords(state, action) {
      const { page, records } = action.payload;
      state[page] = records;
    },
  },
});

export const {
  addAdminRecord,
  addAdminRecords,
  removeLastAddedRecord,
} = adminSlice.actions;

export default adminSlice.reducer;
