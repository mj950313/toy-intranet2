import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./userSlice.ts";

export default configureStore({
  reducer: {
    user: counterSlice,
  },
});
