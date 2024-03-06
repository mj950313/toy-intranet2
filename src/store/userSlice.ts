import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    replaceUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export default counterSlice.reducer;
export const { replaceUsers } = counterSlice.actions;
