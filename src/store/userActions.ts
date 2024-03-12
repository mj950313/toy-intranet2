import { Dispatch } from "@reduxjs/toolkit";
import { replaceUsers } from "./userSlice";
import { UserType } from "../types/user";

export const fetchUsersData = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://toylogin2-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      );
      const data = await response.json();
      return data;
    };

    try {
      const usersData = await fetchData();
      dispatch(replaceUsers(usersData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendUsersData = (users: UserType[]) => {
  return async () => {
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
    } catch (error) {
      console.log(error);
    }
  };
};
