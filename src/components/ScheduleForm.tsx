import { FormEvent } from "react";
import { times } from "../util/date";
import { ScheduleType } from "../types/user";
import { useDispatch } from "react-redux";
import { addSchedule, editSchedule } from "../store/userSlice";
import uuid from "react-uuid";

type Props = {
  onAddClose?: () => void;
  onEditClose: () => void;
  date: string;
  schedule?: ScheduleType;
};

const emptySchedule = { id: "", title: "", time: "", description: "" };

export default function ScheduleForm({
  onAddClose,
  onEditClose,
  date,
  schedule = emptySchedule,
}: Props) {
  const { id, time, title, description } = schedule;

  const [startTime, endTime] = time.split("-");

  const dispatch = useDispatch();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const startTime = (data["start-time"] as string).padStart(2, "0");
    const endTime = (data["end-time"] as string).padStart(2, "0");
    data.time = `${startTime}-${endTime}`;
    data.date = date;

    if (id) {
      data.id = id;
      dispatch(editSchedule(data));
      onEditClose();
    } else {
      data.id = uuid();
      dispatch(addSchedule(data));
      onAddClose();
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-myorange p-2 rounded-sm text-white flex flex-col gap-2"
    >
      <div className="flex justify-between">
        <label>시작시간</label>
        <select
          className="text-black rounded-sm"
          defaultValue={parseInt(startTime) || "0"}
          name="start-time"
        >
          {times.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <label>종료시간</label>
        <select
          className="text-black rounded-sm"
          defaultValue={parseInt(endTime) || "0"}
          name="end-time"
        >
          {times.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mr-2">제목</label>
        <input
          className="pl-1 rounded-sm text-black"
          defaultValue={title || ""}
          name="title"
        />
      </div>
      <div>
        <label className="mr-2">설명</label>
        <input
          className="pl-1 rounded-sm text-black"
          defaultValue={description || ""}
          name="description"
        />
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={onEditClose}
          className="bg-white text-myorange px-2 rounded-sm"
        >
          취소
        </button>
        <button className="bg-white text-myorange px-2 rounded-sm">확인</button>
      </div>
    </form>
  );
}
