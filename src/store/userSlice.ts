import { createSlice } from "@reduxjs/toolkit";
import { initialUser } from "../user.ts";

export const counterSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {},
});

export default counterSlice.reducer;
