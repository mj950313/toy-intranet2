import { useState } from "react";
import { SchedulesByDateType, UserType } from "../types/user";
import ScheduleModal from "./ScheduleModal";

type PropsType = {
  users: UserType[];
  date: string;
};

const times = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export default function TimeTable({ users, date }: PropsType) {
  const [selectedSchedule, setSelectedSchedule] = useState<SchedulesByDateType>({
    id: "",
    date: "",
    schedules: [],
  });
  const [isOpen, setIsOpen] = useState(false);

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
                  setSelectedSchedule(
                    currentSchedule || { id: "", date: "", schedules: [] }
                  );
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
      {isOpen && <ScheduleModal selectedSchedule={selectedSchedule} />}
    </>
  );
}
