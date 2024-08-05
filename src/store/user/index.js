import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUserName(state, action) {
      const { userName } = action.payload;
      state.userName = userName;
    },
    addUserToken(state, action) {
      const { token } = action.payload;
      state.token = token;
    },
    addUserEmail(state, action) {
      const { email } = action.payload;
      state.email = email;
    },
  },
});

export const { addUserName, addUserToken, addUserEmail } = userSlice.actions;

export default userSlice.reducer;
