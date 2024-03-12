import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./userSlice.ts";
import uiSlice from "./uiSlice.ts";

export default configureStore({
  reducer: {
    user: counterSlice,
    ui: uiSlice,
  },
});
