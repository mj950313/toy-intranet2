import { replaceUsers } from "./userSlice";

export function fetchUsersData() {
  return async (dispatch) => {
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
    } catch (err) {
      //...
    }
  };
}
