import { createSlice } from "@reduxjs/toolkit";

const expectedDrawdownsSlice = createSlice({
  name: "expectedDrawdowns",
  initialState: [],
  reducers: {
    insertExpectedDrawdownsData(state, action) {
      const { expectedDrawdowns } = action.payload;
      return [...expectedDrawdowns];
    },
  },
});

export const { insertExpectedDrawdownsData } = expectedDrawdownsSlice.actions;

export default expectedDrawdownsSlice.reducer;
