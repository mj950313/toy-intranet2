import { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import { ScheduleType } from "../types/user";
import ScheduleForm from "./ScheduleForm";
import { useDispatch } from "react-redux";
import { deleteSchedule } from "../store/userSlice";

type Props = {
  schedule: ScheduleType;
  date: string;
};

export default function ScheduleItem({ schedule, date }: Props) {
  const [isEditForm, setIsEditForm] = useState(false);
  const dispatch = useDispatch();

  const toggleEditFormHandler = () => {
    setIsEditForm(!isEditForm);
  };

  const deleteScheduleHandler = () => {
    dispatch(deleteSchedule({ ...schedule, date }));
  };

  return (
    <>
      {!isEditForm && (
        <div className="bg-myorange text-white rounded-sm p-2 relative group">
          <p>{schedule.time}</p>
          <p>제목: {schedule.title}</p>
          <p>설명: {schedule.description}</p>
          <CloseIcon
            onClick={deleteScheduleHandler}
            className="absolute top-2 right-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
          />
          <EditIcon
            onClick={toggleEditFormHandler}
            className="absolute bottom-2 right-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
          />
        </div>
      )}
      {isEditForm && (
        <ScheduleForm
          onEditClose={toggleEditFormHandler}
          schedule={schedule}
          date={date}
        />
      )}
    </>
  );
}
