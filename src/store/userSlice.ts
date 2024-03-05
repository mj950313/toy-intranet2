import { createSlice } from "@reduxjs/toolkit";
import { initialUsers } from "../user.ts";

export const counterSlice = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {},
});

export default counterSlice.reducer;
