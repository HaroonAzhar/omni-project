import { createSlice } from "@reduxjs/toolkit";

const associatedTagsSlice = createSlice({
  name: "associatedTags",
  initialState: [],
  reducers: {
    insertAssociatedTagsData(state, action) {
      const { associatedTags } = action.payload;
      return [...associatedTags];
    },
  },
});

export const { insertAssociatedTagsData } = associatedTagsSlice.actions;

export default associatedTagsSlice.reducer;
