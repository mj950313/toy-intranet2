import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./userSlice.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: counterSlice,
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
