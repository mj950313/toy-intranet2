import { useSelector } from "react-redux";
import { UserType } from "../types/user.ts";
import { formatDate } from "../util/date.ts";
import TimeTable from "../components/TimeTable.tsx";
import { useState } from "react";
import PrevButton from "../icons/PrevButton.tsx";
import NextButton from "../icons/NextButton.tsx";

type StateType = {
  user: {
    users: UserType[];
  };
};

export default function HomePage() {
  const users = useSelector((state: StateType) => state.user.users);

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
        <button onClick={goToPrevDay} className="border border-myorange">
          <PrevButton />
        </button>
        <button onClick={goToNextDay} className="border border-myorange">
          <NextButton />
        </button>
        <p>{formatDate(date)}</p>
      </div>
      <TimeTable users={users} date={date} />
    </section>
  );
}
