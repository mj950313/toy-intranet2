import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { fetchStatus: null, sendStatus: null, dataIsLoading: false },
  reducers: {
    changeIsLoading(state, action) {
      state.dataIsLoading = action.payload;
    },
    changeFetchStatus(state, action) {
      state.fetchStatus = action.payload;
    },
    changeSendStatus(state, action) {
      state.sendStatus = action.payload;
    },
  },
});

export const { changeIsLoading, changeFetchStatus, changeSendStatus } =
  uiSlice.actions;

export default uiSlice.reducer;
