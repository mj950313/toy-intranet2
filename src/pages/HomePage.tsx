import { useSelector } from "react-redux";
import { UserType } from "../user";

type StateType = {
  user: UserType;
};

export default function HomePage() {
  const user = useSelector((state: StateType) => state.user);

  return (
    <>
      <h1>HomePage</h1>
    </>
  );
}
