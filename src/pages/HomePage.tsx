import { useSelector } from "react-redux";
import { StateType } from "../types/user.ts";
import { formatDate, formatTableDate } from "../util/date.ts";
import TimeTable from "../components/TimeTable.tsx";
import { useRef, useState } from "react";
import PrevButton from "../icons/PrevButton.tsx";
import NextButton from "../icons/NextButton.tsx";
import CalendarIcon from "../icons/CalendarIcon.tsx";

export default function HomePage() {
  const users = useSelector((state: StateType) => state.user.users);

  const [datePicker, setDatePicker] = useState(formatTableDate(new Date()));

  const calendarRef = useRef<HTMLInputElement | null>(null);

  const goToDay = (num: number) => {
    const newDate = new Date(datePicker);
    const currentDate = new Date(datePicker);
    newDate.setDate(currentDate.getDate() + num);
    setDatePicker(formatTableDate(newDate));
  };

  return (
    <section>
      <div className="flex">
        <div>
          <button
            onClick={() => goToDay(-1)}
            className="border border-myorange"
          >
            <PrevButton />
          </button>
          <button onClick={() => goToDay(1)} className="border border-myorange">
            <NextButton />
          </button>
        </div>
        <p>{formatDate(new Date(datePicker))}</p>
        <div className="relative">
          <label onClick={() => calendarRef.current?.showPicker()}>
            <CalendarIcon />
          </label>
          <input
            ref={calendarRef}
            value={datePicker}
            onChange={(e) => setDatePicker(e.target.value)}
            type="date"
            className="hidden absolute top-0 right-0"
          />
        </div>
      </div>
      <TimeTable users={users} date={datePicker} />
    </section>
  );
}
