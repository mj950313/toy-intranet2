import { useSelector } from "react-redux";
import { UserType } from "../user.ts";
import { formatDate } from "../util/date.ts";
import { useState } from "react";
import TimeTable from "../components/TimeTable.tsx";

type StateType = {
  users: UserType[];
};

export default function HomePage() {
  const users = useSelector((state: StateType) => state.users);

  const [date, setDate] = useState(new Date());

  const goToPrevDay = () => {
    const prevDay = new Date(date);
    prevDay.setDate(date.getDate() - 1);
    setDate(prevDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    setDate(nextDay);
  };

  return (
    <section>
      <div>
        <button onClick={goToPrevDay} className="bg-myorange text-white mr-4">
          뒤로
        </button>
        <button onClick={goToNextDay} className="bg-myorange text-white">
          앞으로
        </button>
        <p>{formatDate(date)}</p>
      </div>
      <TimeTable users={users} date={date} />
    </section>
  );
}
