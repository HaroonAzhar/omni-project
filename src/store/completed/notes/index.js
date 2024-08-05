import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    insertNotesData(state, action) {
      const { notes } = action.payload;
      return [...notes];
    },
  },
});

export const { insertNotesData } = notesSlice.actions;

export default notesSlice.reducer;
