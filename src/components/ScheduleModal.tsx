import { SchedulesByDateType } from "../types/user";
import { createPortal } from "react-dom";
import { formatDate } from "../util/date";
import AddIcon from "../icons/AddIcon";
import ScheduleForm from "./ScheduleForm";
import { useState } from "react";
import ScheduleItem from "./ScheduleItem";
import { useSelector } from "react-redux";
import { UiStateType } from "../types/ui";

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

  const sendError = useSelector((state: UiStateType) => state.ui.sendStatus);

  const sortedSchedules = [...schedules].sort(
    (a, b) => parseInt(a.time.split("-")[0]) - parseInt(b.time.split("-")[0])
  );

  const [isAddForm, setIsAddForm] = useState(false);

  const toggleAddFormHandler = () => {
    setIsAddForm(!isAddForm);
  };

  return createPortal(
    <section
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-50 backdrop-blur-sm bg-neutral-900/80"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-black p-4 rounded-md flex flex-col w-[400px]">
        <p className="text-myorange mb-2 text-center">
          {formatDate(new Date(date))} 일정입니다.
        </p>
        {sendError && (
          <p className="text-center bg-red-300/40 text-red-500 mb-2 rounded-md">
            {sendError}
          </p>
        )}
        <div className="bg-white/10 p-2 rounded-sm flex flex-col gap-2 max-h-[400px] overflow-scroll">
          {sortedSchedules.length > 0 &&
            sortedSchedules.map((schedule) => (
              <ScheduleItem
                key={schedule.id}
                schedule={schedule}
                date={date}
                schedules={schedules}
              />
            ))}
          {sortedSchedules.length === 0 && (
            <div className="text-myorange text-center">일정이 없습니다.</div>
          )}
        </div>

        {!isAddForm && (
          <AddIcon
            className="text-myorange/70 mx-auto text-2xl cursor-pointer mt-2 hover:text-myorange transition"
            onClick={toggleAddFormHandler}
          />
        )}
        {isAddForm && (
          <div className="mt-2">
            <ScheduleForm
              onAddClose={toggleAddFormHandler}
              onEditClose={toggleAddFormHandler}
              date={date}
              schedules={schedules}
            />
          </div>
        )}
      </div>
    </section>,
    document.getElementById("modal") as HTMLElement
  );
}
