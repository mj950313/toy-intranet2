import { UserType } from "../user";
import { formatTableDate } from "../util/date";

type PropsType = {
  users: UserType[];
  date: Date;
};

const times = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export default function TimeTable({ users, date }: PropsType) {
  return (
    <div>
      <div className="flex border">
        <p className="w-[120px] border-r shrink-0"></p>
        <div className="flex border-r w-full">
          {times.map((time) => (
            <div key={time} className="border flex-1">
              <p className="text-center">{time}</p>
            </div>
          ))}
        </div>
      </div>
      {users.map((user) => {
        const currentSchedule = user.schedules.find(
          (s) => s.date === formatTableDate(date)
        );

        const scheduleTime = currentSchedule?.schedule.map((s) => s.time);

        const timeRange = scheduleTime?.map((t) => {
          const [start, end] = t.split("-").map(Number);
          return { start, end };
        });

        return (
          <div key={user.id} className="flex border">
            <p className="w-[120px] border-r shrink-0">{user.name}</p>
            <div className="flex border-r w-full">
              {times.map((time, index) => {
                const isInTimeRange = timeRange?.some(
                  (range) => index >= range.start && index < range.end
                );

                return (
                  <div
                    key={time}
                    className={`border flex-1 ${
                      isInTimeRange && "bg-myorange"
                    }`}
                  >
                    <p className="text-center h-[20px]"></p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
