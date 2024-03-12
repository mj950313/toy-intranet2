import { FormEvent, useState } from "react";
import { ScheduleType } from "../types/user";
import { useDispatch } from "react-redux";
import { addSchedule, editSchedule } from "../store/userSlice";
import uuid from "react-uuid";
import { isValidTime, times } from "../util/time";

type Props = {
  onAddClose?: () => void;
  onEditClose: () => void;
  date: string;
  schedules: ScheduleType[];
  schedule?: ScheduleType;
};

const emptySchedule = { id: "", title: "", time: "", description: "" };
const emptyFn = () => {};

export default function ScheduleForm({
  onAddClose = emptyFn,
  onEditClose,
  date,
  schedules,
  schedule = emptySchedule,
}: Props) {
  const { id, time, title, description } = schedule;

  const [error, setError] = useState("");

  const existingTimes = schedules.map((schedule) => schedule.time);

  const existingTimesWithoutCurrentTime = existingTimes.filter(
    (t) => t !== time
  );

  const Times = id ? existingTimesWithoutCurrentTime : existingTimes;

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

    if (+startTime >= +endTime) {
      setError("시작시간이 종료시간보다 크거나 같을 수 없습니다.");
      return;
    }

    if (!isValidTime(Times, data.time)) {
      setError("겹치는 시간이 있습니다 !");
      return;
    }

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
      className="bg-white/10 p-3 rounded-sm text-myorange flex flex-col gap-2"
    >
      <div className="flex justify-between">
        <label>시작시간</label>
        <select
          className="bg-white/10 text-myorange rounded-sm cursor-pointer p-1"
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
          className="bg-white/10 text-myorange rounded-sm cursor-pointer p-1"
          defaultValue={parseInt(endTime) || "0"}
          name="end-time"
        >
          {times.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <label className="mr-2">제목</label>
        <input
          className="p-[2px] pl-1 rounded-sm text-myorange bg-white/10 outline-none"
          defaultValue={title || ""}
          name="title"
          required
        />
      </div>
      <div className="flex justify-between">
        <label className="mr-2">설명</label>
        <input
          className="p-[2px] pl-1 rounded-sm text-myorange bg-white/10 outline-none"
          defaultValue={description || ""}
          name="description"
          required
        />
      </div>
      <div className="flex justify-center gap-2 mt-2">
        <button
          type="button"
          onClick={() => {
            if (id) {
              onEditClose();
            } else {
              onAddClose();
            }
          }}
          className="w-full bg-myorange/70 text-black py-1 rounded-sm hover:bg-myorange transition"
        >
          취소
        </button>
        <button className="w-full bg-myorange/70 text-black py-1 rounded-sm hover:bg-myorange transition">
          확인
        </button>
      </div>
      {error && <p className="text-center">{error}</p>}
    </form>
  );
}
