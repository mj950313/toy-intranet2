import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { UserType } from "../types/user";
import { ReducerStateType } from "../types/user";
import { getAuthToken } from "../util/auth";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loginUser: null,
    changed: false,
    isLogin: !!getAuthToken(),
  },
  reducers: {
    replaceUsers(state, action) {
      state.users = action.payload;
    },
    replaceLoginUser(state, action) {
      state.loginUser = action.payload.loginUser;
      state.isLogin = action.payload.isLogin;
    },
    addSchedule(state: ReducerStateType, action) {
      state.changed = true;
      const { id, time, title, description, date } = action.payload;
      const newSchedule = { id, time, title, description };

      const selectedUser = state.users.find(
        (user: UserType) => user.id === state.loginUser?.id
      );

      const selectedScheduleByDate = selectedUser?.schedulesByDate.find(
        (s) => s.date === date
      );

      if (selectedScheduleByDate) {
        selectedScheduleByDate.schedules.push(newSchedule);
      } else {
        const newSchedulesByDate = {
          id: uuid(),
          date,
          schedules: [newSchedule],
        };
        selectedUser?.schedulesByDate.push(newSchedulesByDate);
      }
    },
    editSchedule(state: ReducerStateType, action) {
      state.changed = true;
      const { id, time, title, description, date } = action.payload;
      const newSchedule = { id, time, title, description };

      const selectedUser = state.users.find(
        (user: UserType) => user.id === state.loginUser?.id
      );

      const selectedScheduleByDate = selectedUser?.schedulesByDate.find(
        (s) => s.date === date
      );

      const selectedSchedule = selectedScheduleByDate?.schedules.find(
        (s) => s.id === id
      );

      Object.assign(selectedSchedule , newSchedule);
    },
    deleteSchedule(state: ReducerStateType, action) {
      state.changed = true;

      const { id, date } = action.payload;

      const selectedUser = state.users.find(
        (user: UserType) => user.id === state.loginUser?.id
      );

      const selectedScheduleByDate = selectedUser?.schedulesByDate.find(
        (s) => s.date === date
      );

      if (selectedScheduleByDate) {
        const newSchedules = selectedScheduleByDate.schedules.filter(
          (s) => s.id !== id
        );

        selectedScheduleByDate.schedules = newSchedules;
      }
    },
  },
});

export default counterSlice.reducer;
export const {
  replaceUsers,
  replaceLoginUser,
  addSchedule,
  editSchedule,
  deleteSchedule,
} = counterSlice.actions;
