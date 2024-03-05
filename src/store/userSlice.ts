import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    replaceUsers(state,action) {
      state = action.payload;
      console.log(action.payload);
      console.log(state)
    }
  },
});

export default counterSlice.reducer;
export const { replaceUsers } = counterSlice.actions