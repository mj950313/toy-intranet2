import { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import { ScheduleType, SchedulesByDateType, StateType } from "../types/user";
import ScheduleForm from "./ScheduleForm";
import { useSelector } from "react-redux";
import { sendUsersData } from "../store/userSlice";
import { cloneDeep } from "lodash";
import { ClipLoader } from "react-spinners";
import { useAppDispatch } from "../store/store";

type Props = {
  schedule: ScheduleType;
  date: string;
  schedules: ScheduleType[];
  setReqMode: (arg0: string) => void;
};

export default function ScheduleItem({
  schedule,
  date,
  schedules,
  setReqMode,
}: Props) {
  const [isEditForm, setIsEditForm] = useState(false);

  const users = useSelector((state: StateType) => state.user.users);
  const loginUser = useSelector((state: StateType) => state.user.loginUser);
  const sendStatus = useSelector((state: StateType) => state.user.sendStatus);
  const dispatch = useAppDispatch();

  const toggleEditFormHandler = () => {
    setIsEditForm(!isEditForm);
  };

  const deleteScheduleHandler = () => {
    const newUsers = cloneDeep(users);
    const selectedUser = newUsers.find((user) => user.id === loginUser?.id);

    const selectedScheduleByDate = selectedUser?.schedulesByDate.find(
      (s) => s.date === date
    );

    setReqMode("delete");

    if (!selectedScheduleByDate) {
      return;
    }

    if (selectedScheduleByDate?.schedules.length > 1) {
      const newSchedules = selectedScheduleByDate.schedules.filter(
        (s) => s.id !== schedule.id
      );

      selectedScheduleByDate.schedules = newSchedules;
    } else if (selectedScheduleByDate.schedules.length === 1) {
      const newSchedulesByDate = loginUser?.schedulesByDate.filter(
        (s) => s.date !== date
      );

      if (!selectedUser) {
        return;
      }

      selectedUser.schedulesByDate =
        newSchedulesByDate as SchedulesByDateType[];
    }

    dispatch(sendUsersData(newUsers));
  };

  return (
    <>
      {!isEditForm && (
        <div className="bg-white/10 text-myorange rounded-sm p-2 relative group">
          <p>{schedule.time}</p>
          <p>제목: {schedule.title}</p>
          <p>설명: {schedule.description}</p>
          {sendStatus !== "pending" && (
            <CloseIcon
              onClick={deleteScheduleHandler}
              className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
            />
          )}
          {sendStatus === "pending" && (
            <ClipLoader
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
              color="#f46804"
              size={24}
            />
          )}
          <EditIcon
            onClick={toggleEditFormHandler}
            className="absolute bottom-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
          />
        </div>
      )}
      {isEditForm && (
        <ScheduleForm
          onEditClose={toggleEditFormHandler}
          schedule={schedule}
          date={date}
          schedules={schedules}
          setReqMode={setReqMode}
        />
      )}
    </>
  );
}
