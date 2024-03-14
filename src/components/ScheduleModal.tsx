import { SchedulesByDateType, StateType } from "../types/user";
import { createPortal } from "react-dom";
import { formatDate } from "../util/date";
import AddIcon from "../icons/AddIcon";
import ScheduleForm from "./ScheduleForm";
import { useState } from "react";
import ScheduleItem from "./ScheduleItem";
import { useSelector } from "react-redux";

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
  const [reqMode, setReqMode] = useState("");

  const sendStatus = useSelector((state: StateType) => state.user.sendStatus);

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
        <div className="bg-white/10 p-2 rounded-sm flex flex-col gap-2 max-h-[400px] overflow-y-scroll">
          {sortedSchedules.length > 0 &&
            sortedSchedules.map((schedule) => (
              <ScheduleItem
                key={schedule.id}
                schedule={schedule}
                date={date}
                schedules={schedules}
                setReqMode={setReqMode}
              />
            ))}
          {sortedSchedules.length === 0 && (
            <div className="text-myorange text-center">일정이 없습니다.</div>
          )}
        </div>
        {!isAddForm && (
          <AddIcon
            className="text-myorange/70 mx-auto text-3xl cursor-pointer mt-2 hover:text-myorange transition"
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
              setReqMode={setReqMode}
            />
          </div>
        )}
        {sendStatus === "rejected" && reqMode === "add" && (
          <p className="bg-red-500 p-1 text-center mt-2 text-white">
            일정 추가에 실패했습니다.
          </p>
        )}
        {sendStatus === "rejected" && reqMode === "edit" && (
          <p className="bg-red-500 p-1 text-center mt-2 text-white">
            일정 수정에 실패했습니다.
          </p>
        )}
        {sendStatus === "rejected" && reqMode === "delete" && (
          <p className="bg-red-500 p-1 text-center mt-2 text-white">
            일정 삭제에 실패했습니다.
          </p>
        )}
      </div>
    </section>,
    document.getElementById("modal") as HTMLElement
  );
}
