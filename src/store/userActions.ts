import { replaceUsers } from "./userSlice";

export function fetchUsersData() {
  return async (dispatch) => {
        const fetchData = async () => {
            const rep = await fetch(
                "https://toylogin2-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
            );
            const json = await rep.json();
            return json
    }
    try {
        const usersData = await fetchData();
        dispatch(replaceUsers(usersData));
    } catch (err) {
        //...
    }
  }
}