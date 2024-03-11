import { useState } from "react";
import { UserType } from "../types/user";
import { times } from "../util/time";
import ScheduleModal from "./ScheduleModal";

type PropsType = {
  users: UserType[];
  date: string;
};

export default function UsersSchedule({ users, date }: PropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const selectedSchedule = users
    .find((user) => user.id === userId)
    ?.schedulesByDate.find((schedule) => schedule.date === date);

  return (
    <>
      <section>
        <div className="bg-white/10 rounded-md p-4 grid grid-cols-4 gap-4">
          {users.map((user) => {
            const currentSchedule = user.schedulesByDate.find(
              (s) => s.date === date
            );

            const timeRange = currentSchedule?.schedules.map((s) => {
              const [start, end] = s.time.split("-").map(Number);
              const title = s.title;
              return { start, end, title };
            });

            return (
              <div key={user.id}>
                <div
                  onClick={() => {
                    setUserId(user.id);
                    setIsOpen(true);
                  }}
                  className="bg-white/10 rounded-md p-4 hover:bg-white/20 transition cursor-pointer"
                >
                  <p className="text-center">{user.name}</p>
                  <div className="w-full h-[344px] overflow-y-scroll scrollbar-hide relative">
                    {times.map((time) => (
                      <div key={time} className="flex">
                        <p className="h-6 basis-1/6">{time}</p>
                        <p className="basis-5/6 border-t border-myorange translate-y-3"></p>
                      </div>
                    ))}
                    {timeRange?.map((t) => {
                      const startingHeight = 12 + t.start * 24;
                      const height = (t.end - t.start) * 24;

                      return (
                        <div
                          key={t.start}
                          style={{ height: height, top: startingHeight }}
                          className="w-[160px] bg-myorange/60 absolute right-[20px] rounded-md text-white flex justify-center items-center"
                        >
                          {t.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
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
