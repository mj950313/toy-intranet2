import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./userSlice";

export default configureStore({
  reducer: {
    user: counterSlice,
  },
});
