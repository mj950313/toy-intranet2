import { SchedulesByDateType } from "../types/user";
import { createPortal } from "react-dom";
import { formatDate } from "../util/date";
import AddIcon from "../icons/AddIcon";
import ScheduleForm from "./ScheduleForm";
import { useState } from "react";
import ScheduleItem from "./ScheduleItem";

type PropsType = {
  selectedSchedule: SchedulesByDateType;
  date: string;
  onClose: () => void;
};

export default function ScheduleModal({
  selectedSchedule,
  date,
  onClose,
}: PropsType) {
  const { schedules } = selectedSchedule;

  const [isAddForm, setIsAddForm] = useState(false);

  const toggleAddFormHandler = () => {
    setIsAddForm(!isAddForm);
  };

  return createPortal(
    <section
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-4 rounded-md flex flex-col gap-2">
        <p className="text-black">{formatDate(new Date(date))} 일정입니다.</p>
        {schedules.length > 0 &&
          schedules.map((schedule) => (
            <ScheduleItem key={schedule.id} schedule={schedule} date={date} />
          ))}
        {schedules.length === 0 && (
          <div className="text-black text-center">일정이 없습니다.</div>
        )}
        {!isAddForm && (
          <AddIcon
            className="text-myorange mx-auto text-2xl cursor-pointer"
            onClick={toggleAddFormHandler}
          />
        )}
        {isAddForm && (
          <ScheduleForm
            onAddClose={toggleAddFormHandler}
            onEditClose={toggleAddFormHandler}
            date={date}
          />
        )}
      </div>
    </section>,
    document.getElementById("modal") as HTMLElement
  );
}
