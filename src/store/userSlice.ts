import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loginUser: null,
  },
  reducers: {
    replaceUsers(state, action) {
      state.users = action.payload;
    },
    replaceLoginUser(state, action) {
      state.loginUser = action.payload;
    },
  },
});

export default counterSlice.reducer;
export const { replaceUsers, replaceLoginUser } = counterSlice.actions;
