import { useSelector } from "react-redux";
import { formatDate, formatTableDate } from "../util/date.ts";
import TimeTable from "../components/TimeTable.tsx";
import { useRef, useState } from "react";
import PrevIcon from "../icons/PrevIcon.tsx";
import NextIcon from "../icons/NextIcon.tsx";
import CalendarIcon from "../icons/CalendarIcon.tsx";
import { StateType } from "../types/user.ts";
import UsersSchedule from "../components/UsersSchedule.tsx";

export default function HomePage() {
  const users = useSelector((state: StateType) => state.user.users);

  const [datePicker, setDatePicker] = useState(formatTableDate(new Date()));

  const calendarRef = useRef<HTMLInputElement>(null);

  const goToDay = (num: number) => {
    const newDate = new Date(datePicker);
    const currentDate = new Date(datePicker);
    newDate.setDate(currentDate.getDate() + num);
    setDatePicker(formatTableDate(newDate));
  };

  const buttonStyle =
    "border border-myorange w-[40px] h-[30px] hover:bg-myorange hover:text-myblack transition";

  return (
    <section className="backdrop-blur-sm bg-white/20 p-4">
      <div className="flex gap-4 items-center mb-4">
        <div className="h-[30px]">
          <button
            onClick={() => goToDay(-1)}
            className={`${buttonStyle} rounded-l-sm`}
          >
            <PrevIcon />
          </button>
          <button
            onClick={() => goToDay(1)}
            className={`${buttonStyle} rounded-r-sm`}
          >
            <NextIcon />
          </button>
        </div>
        <div
          onClick={() => calendarRef.current?.showPicker()}
          className="flex relative w-[30px] h-[30px]"
        >
          <CalendarIcon className="w-full h-full absolute top-0 left-0 z-10 cursor-pointer" />
          <input
            ref={calendarRef}
            value={datePicker}
            onChange={(e) => setDatePicker(e.target.value)}
            type="date"
            className="w-full h-full opacity-0"
          />
        </div>
        <p>{formatDate(new Date(datePicker))}</p>
      </div>
      <UsersSchedule users={users} date={datePicker} />
      {/* <TimeTable users={users} date={datePicker} /> */}
    </section>
  );
}
