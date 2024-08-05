import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {},
  premium_for_lenders_insurance: 250,
  completion_administration_fee: 400,
};

const dipSlice = createSlice({
  name: "dip",
  initialState: {},
  reducers: {
    insertDipData(state, action) {
      const { dip } = action.payload;
      return { ...dip };
    },

    updateDipData(state, action) {
      const { dip } = action.payload;
      return { ...state, ...dip };
    },

    clearDipData(state, _action) {
      return { ...state, ...initialState };
    },
  },
});

export const { insertDipData, updateDipData, clearDipData } = dipSlice.actions;

export default dipSlice.reducer;
