import { Dispatch } from "@reduxjs/toolkit";
import { replaceUsers } from "./userSlice";
import { UserType } from "../types/user";
import {
  changeFetchStatus,
  changeIsLoading,
  changeSendStatus,
} from "./uiSlice";

export const fetchUsersData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(changeIsLoading(true));
    const fetchData = async () => {
      const response = await fetch(
        "https://toylogin2-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      );
      const data = await response.json();
      return data;
    };

    try {
      const usersData = await fetchData();
      dispatch(changeFetchStatus(null));
      dispatch(replaceUsers(usersData));
    } catch (error) {
      dispatch(changeFetchStatus("데이터를 불러오는데에 실패했습니다."));
    } finally {
      dispatch(changeIsLoading(false));
    }
  };
};

export const sendUsersData = (users: UserType[]) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://toylogin2-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
        {
          method: "PUT",
          body: JSON.stringify(users),
        }
      );

      if (!response.ok) {
        throw new Error("Sending users data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(changeSendStatus(null));
    } catch (error) {
      dispatch(changeSendStatus("데이터를 전송하지 못했습니다."));
    }
  };
};
