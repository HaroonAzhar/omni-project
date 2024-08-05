import { createSlice } from "@reduxjs/toolkit";

const defaultEventsSlice = createSlice({
  name: "defaultEvents",
  initialState: [],
  reducers: {
    insertDefaultEventsData(state, action) {
      const { defaultEvents } = action.payload;
      return [...defaultEvents];
    },
  },
});

export const { insertDefaultEventsData } = defaultEventsSlice.actions;

export default defaultEventsSlice.reducer;
