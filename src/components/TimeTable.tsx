import { useState } from "react";
import { times } from "../util/date";
import { UserType } from "../types/user";
import ScheduleModal from "./ScheduleModal";

type PropsType = {
  users: UserType[];
  date: string;
};

export default function TimeTable({ users, date }: PropsType) {
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedSchedule = users
    .find((user) => user.id === userId)
    ?.schedulesByDate.find((schedule) => schedule.date === date);

  return (
    <>
      <div>
        <div className="flex border border-b-0 rounded-t-sm">
          <p className="w-[120px] border-r shrink-0"></p>
          <div className="flex w-full">
            {times.map((time, index) => (
              <div
                key={time}
                className={`border-r flex-1 h-[30px] text-center leading-[30px] ${
                  index === times.length - 1 && "border-r-0"
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
        {users.map((user, index) => {
          const currentSchedule = user.schedulesByDate.find(
            (s) => s.date === date
          );

          const scheduleTime = currentSchedule?.schedules.map((s) => s.time);

          const timeRange = scheduleTime?.map((t) => {
            const [start, end] = t.split("-").map(Number);
            return { start, end };
          });

          return (
            <div
              key={user.id}
              className={`flex border ${
                index !== users.length - 1 && "border-b-0"
              }`}
            >
              <p
                onClick={() => {
                  setUserId(user.id);
                  setIsOpen(true);
                }}
                className="w-[120px] border-r shrink-0 pl-4 h-[40px] leading-[40px]"
              >
                {user.name}
              </p>
              <div className="flex w-full">
                {times.map((time, index) => {
                  const isInTimeRange = timeRange?.some(
                    (range) => index >= range.start && index < range.end
                  );

                  return (
                    <div
                      key={time}
                      className={`border-r flex-1 ${
                        isInTimeRange && "bg-myorange"
                      } ${index === times.length - 1 && "border-r-0"}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {isOpen && (
        <ScheduleModal
          selectedSchedule={
            selectedSchedule || { id: "", date: "", schedules: [] }
          }
          date={date}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}