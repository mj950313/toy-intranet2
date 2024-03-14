import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthToken } from "../util/auth";
import { UserType } from "../types/user";

export const fetchUsersData = createAsyncThunk(
  "userSlice/fetchUsersData",
  async () => {
    const response = await fetch(
      "https://toylogin2-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
    );
    const data = await response.json();
    return data;
  }
);

export const sendUsersData = createAsyncThunk(
  "userSlice/sendUsersData",
  async (users: UserType[]) => {
    const response = await fetch(
      "https://toylogin2-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
      {
        method: "PUT",
        body: JSON.stringify(users),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loginUser: null,
    isLogin: !!getAuthToken(),
    fetchStatus: "",
    sendStatus: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersData.pending, (state) => {
      state.fetchStatus = "pending";
    });
    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
      state.users = action.payload;
      state.fetchStatus = "fulfilled";
    });
    builder.addCase(fetchUsersData.rejected, (state) => {
      state.fetchStatus = "rejected";
    });
    builder.addCase(sendUsersData.pending, (state) => {
      state.sendStatus = "pending";
    });
    builder.addCase(sendUsersData.fulfilled, (state, action) => {
      state.users = action.payload;
      state.sendStatus = "fulfilled";
    });
    builder.addCase(sendUsersData.rejected, (state) => {
      state.sendStatus = "rejected";
    });
  },
  reducers: {
    replaceLoginUser(state, action) {
      state.loginUser = action.payload.loginUser;
      state.isLogin = action.payload.isLogin;
    },
  },
});

export default counterSlice.reducer;
export const { replaceLoginUser } = counterSlice.actions;
