import { createSlice } from "@reduxjs/toolkit";

const waypointsSlice = createSlice({
  name: "waypoints",
  initialState: [],
  reducers: {
    insertWaypointsData(state, action) {
      const { waypoints } = action.payload;
      return [...waypoints];
    },
  },
});

export const { insertWaypointsData } = waypointsSlice.actions;

export default waypointsSlice.reducer;
