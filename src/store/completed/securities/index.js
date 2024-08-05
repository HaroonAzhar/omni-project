import { createSlice } from "@reduxjs/toolkit";

const securitiesSlice = createSlice({
  name: "securities",
  initialState: [],
  reducers: {
    insertSecuritiesData(state, action) {
      const { securities } = action.payload;
      return [...securities];
    },
  },
});

export const { insertSecuritiesData } = securitiesSlice.actions;

export default securitiesSlice.reducer;
